"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "@/lib/server/appwrite";
import { parseStringify } from "@/lib/utils";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_CARD_APPLICATION_COLLECTION_ID: CARD_APP_COLLECTION_ID,
} = process.env;

export const createCardApplication = async (
  application: CreateCardApplicationProps
) => {
  try {
    const { database } = await createAdminClient();
    const doc = await database.createDocument(
      DATABASE_ID!,
      CARD_APP_COLLECTION_ID!,
      ID.unique(),
      {
        ...application,
        status: "pending",
      }
    );
    return parseStringify(doc);
  } catch (error) {
    console.error("createCardApplication error", error);
  }
};

export const listCardApplicationsByUser = async ({
  userId,
}: {
  userId: string;
}) => {
  try {
    const { database } = await createAdminClient();
    const result = await database.listDocuments(
      DATABASE_ID!,
      CARD_APP_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );
    return parseStringify(result.documents);
  } catch (error) {
    console.error("listCardApplicationsByUser error", error);
    return [];
  }
};
