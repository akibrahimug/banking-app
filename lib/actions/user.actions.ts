"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import {
  encryptId,
  extractCustomerIdFromUrl,
  parseStringify,
} from "@/lib/utils";
import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";

import { plaidClient } from "@/lib/plaid";
import { revalidatePath } from "next/cache";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const user = await getUserInfo({ userId: session.userId });

    return parseStringify(user);
  } catch (error) {
    console.error("Error", error);
  }
};

export const signUp = async ({ password, ...userData }: SignUpParams) => {
  const { email, firstName, lastName } = userData;

  let newUserAccount;

  try {
    const { account, database } = await createAdminClient();

    newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );

    if (!newUserAccount) throw new Error("Error creating user");

    const dwollaCustomerUrl = await createDwollaCustomer({
      ...userData,
      type: "personal",
    });

    if (!dwollaCustomerUrl) throw new Error("Error creating Dwolla customer");

    const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id,
        dwollaCustomerId,
        dwollaCustomerUrl,
        earnInterestEnabled: false,
      }
    );

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUser);
  } catch (error) {
    console.error("Error", error);
  }
};

// Ensure a demo user exists and is signed in
export const ensureDemoUser = async () => {
  const demoCredentials = {
    email: "good_user@gooduser.com",
    password: "good_user",
  };

  // Try to sign in
  const existing = await signIn(demoCredentials);
  if (existing) {
    // Ensure at least one sandbox bank is linked
    try {
      // attempt to fetch banks; if none, link one via Plaid sandbox flow
      const { getBanks } = await import("@/lib/actions/user.actions");
      const banks = await getBanks({ userId: existing.$id });
      if (!banks || banks.length === 0) {
        // lazy import to avoid circulars at module top
        const { plaidClient } = await import("@/lib/plaid");
        const { addFundingSource } = await import("./dwolla.actions");
        const { createBankAccount } = await import(
          "@/lib/actions/user.actions"
        );
        const { encryptId } = await import("@/lib/utils");

        const sandboxPublic = await plaidClient.sandboxPublicTokenCreate({
          institution_id: "ins_109508",
          initial_products: ["auth", "transactions", "identity"],
        });

        const exchange = await plaidClient.itemPublicTokenExchange({
          public_token: sandboxPublic.data.public_token,
        });

        const accessToken = exchange.data.access_token;
        const accountsResponse = await plaidClient.accountsGet({
          access_token: accessToken,
        });
        const accountData = accountsResponse.data.accounts[0];
        const processor = await plaidClient.processorTokenCreate({
          access_token: accessToken,
          account_id: accountData.account_id,
          processor: "dwolla",
        });
        const processorToken = processor.data.processor_token;
        const fundingSourceUrl = await addFundingSource({
          dwollaCustomerId: existing.dwollaCustomerId,
          processorToken,
          bankName: accountData.name,
        });
        if (fundingSourceUrl) {
          await createBankAccount({
            userId: existing.$id,
            bankId: exchange.data.item_id,
            accountId: accountData.account_id,
            accessToken,
            fundingSourceUrl,
            shareableId: encryptId(accountData.account_id),
          });
        }
      }
    } catch (err) {
      console.log("ensureDemoUser: failed to ensure demo bank", err);
    }
    return existing;
  }

  // If sign-in failed, attempt to create and sign in
  const demoUserData: SignUpParams = {
    firstName: "Good",
    lastName: "User",
    address1: "123 Main St",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    dateOfBirth: "1990-01-01",
    ssn: "1234",
    email: demoCredentials.email,
    password: demoCredentials.password,
  };

  const created = await signUp(demoUserData);
  try {
    if (created) {
      const { plaidClient } = await import("@/lib/plaid");
      const { addFundingSource } = await import("./dwolla.actions");
      const { createBankAccount } = await import("@/lib/actions/user.actions");
      const { encryptId } = await import("@/lib/utils");

      const sandboxPublic = await plaidClient.sandboxPublicTokenCreate({
        institution_id: "ins_109508",
        initial_products: ["auth", "transactions", "identity"],
      });
      const exchange = await plaidClient.itemPublicTokenExchange({
        public_token: sandboxPublic.data.public_token,
      });
      const accessToken = exchange.data.access_token;
      const accountsResponse = await plaidClient.accountsGet({
        access_token: accessToken,
      });
      const accountData = accountsResponse.data.accounts[0];
      const processor = await plaidClient.processorTokenCreate({
        access_token: accessToken,
        account_id: accountData.account_id,
        processor: "dwolla",
      });
      const processorToken = processor.data.processor_token;
      const fundingSourceUrl = await addFundingSource({
        dwollaCustomerId: created.dwollaCustomerId,
        processorToken,
        bankName: accountData.name,
      });
      if (fundingSourceUrl) {
        await createBankAccount({
          userId: created.$id,
          bankId: exchange.data.item_id,
          accountId: accountData.account_id,
          accessToken,
          fundingSourceUrl,
          shareableId: encryptId(accountData.account_id),
        });
      }
    }
  } catch (err) {
    console.log("ensureDemoUser (created): failed to ensure demo bank", err);
  }
  return created;
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();

    const user = await getUserInfo({ userId: result.$id });

    return parseStringify(user);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete("appwrite-session");

    await account.deleteSession("current");
  } catch (error) {
    return null;
  }
};

export const setInterestEnrollment = async ({
  userId,
  enrolled,
}: {
  userId: string;
  enrolled: boolean;
}) => {
  try {
    const { database } = await createAdminClient();
    const userList = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );
    const doc = userList.documents?.[0];
    if (!doc) return null;
    const updated = await database.updateDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      doc.$id,
      { earnInterestEnabled: enrolled }
    );
    revalidatePath("/");
    return parseStringify(updated);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id,
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ["auth", "transactions", "identity"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    };

    const response = await plaidClient.linkTokenCreate(tokenParams);

    return parseStringify({ linkToken: response.data.link_token });
  } catch (error) {
    console.log(error);
  }
};

export const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  shareableId,
}: createBankAccountProps) => {
  try {
    const { database } = await createAdminClient();

    const bankAccount = await database.createDocument(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        shareableId,
      }
    );

    return parseStringify(bankAccount);
  } catch (error) {
    console.log(error);
  }
};

export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
    // Exchange public token for access token and item ID
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // Get account information from Plaid using the access token
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    // Create a processor token for Dwolla using the access token and account ID
    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse = await plaidClient.processorTokenCreate(
      request
    );
    const processorToken = processorTokenResponse.data.processor_token;

    // Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });

    // If the funding source URL is not created, throw an error
    if (!fundingSourceUrl) throw Error;

    // Create a bank account using the user ID, item ID, account ID, access token, funding source URL, and shareableId ID
    await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      shareableId: encryptId(accountData.account_id),
    });

    // Revalidate the path to reflect the changes
    revalidatePath("/");

    // Return a success message
    return parseStringify({
      publicTokenExchange: "complete",
    });
  } catch (error) {
    console.error("An error occurred while creating exchanging token:", error);
  }
};

export const getBanks = async ({ userId }: getBanksProps) => {
  try {
    const { database } = await createAdminClient();

    const banks = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(banks.documents);
  } catch (error) {
    console.log(error);
  }
};

export const getBank = async ({ documentId }: getBankProps) => {
  try {
    const { database } = await createAdminClient();

    const bank = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("$id", [documentId])]
    );

    return parseStringify(bank.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

export const getBankByAccountId = async ({
  accountId,
}: getBankByAccountIdProps) => {
  try {
    const { database } = await createAdminClient();

    const bank = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("accountId", [accountId])]
    );

    if (bank.total !== 1) return null;

    return parseStringify(bank.documents[0]);
  } catch (error) {
    console.log(error);
  }
};
