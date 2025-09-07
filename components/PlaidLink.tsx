import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { useRouter } from "next/navigation";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/lib/actions/user.actions";
import Image from "next/image";
import LoadingButton from "@/components/LoadingButton";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();

  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);

      setToken(data?.linkToken);
    };

    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      setIsLoading(true);
      try {
        await exchangePublicToken({
          publicToken: public_token,
          user,
        });
        router.push("/");
      } catch (error) {
        console.error("Error exchanging token:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [user, router]
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  const showPlaidSandboxAlert = () => {
    const lines = [
      "Plaid Sandbox Helper",
      "",
      "Use these credentials in the Plaid popup:",
      "Institution: First Platypus Bank",
      "Username: user_good",
      "Password: pass_good",
      "MFA (if asked): 1234 or 123456",
      "",
      "You can leave other non-required fields empty and continue.",
    ];
    if (typeof window !== "undefined") {
      window.alert(lines.join("\n"));
    }
  };

  const handleOpen = () => {
    showPlaidSandboxAlert();
    open();
  };

  return (
    <>
      {variant === "primary" ? (
        <LoadingButton
          onClick={handleOpen}
          disabled={!ready}
          isLoading={isLoading}
          loadingText="Connecting..."
          className="plaidlink-primary"
        >
          Connect bank
        </LoadingButton>
      ) : variant === "ghost" ? (
        <LoadingButton
          onClick={handleOpen}
          variant="ghost"
          isLoading={isLoading}
          iconSize={20}
          className="plaidlink-ghost"
        >
          <Image
            src="/icons/connect-bank.svg"
            alt="connect bank"
            width={20}
            height={20}
            className="opacity-70"
          />
          <p className="hiddenl text-[16px] font-semibold text-foreground xl:block">
            Connect bank
          </p>
        </LoadingButton>
      ) : (
        <LoadingButton
          onClick={handleOpen}
          variant="outline"
          isLoading={isLoading}
          iconSize={20}
          className="plaidlink-default"
        >
          <Image
            src="/icons/connect-bank.svg"
            alt="connect bank"
            width={20}
            height={20}
            className="opacity-70"
          />
          <p className="text-[16px] font-semibold sidebar-label text-foreground ml-3">
            Connect bank
          </p>
        </LoadingButton>
      )}
      {null}
    </>
  );
};

export default PlaidLink;
