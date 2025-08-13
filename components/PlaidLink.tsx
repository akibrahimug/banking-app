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
import GradientIcon from "@/components/GradientIcon";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();

  const [token, setToken] = useState("");

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);

      setToken(data?.linkToken);
    };

    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });

      router.push("/");
    },
    [user]
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
        <Button
          onClick={handleOpen}
          disabled={!ready}
          className="plaidlink-primary"
        >
          Connect bank
        </Button>
      ) : variant === "ghost" ? (
        <Button
          onClick={handleOpen}
          variant="ghost"
          className="plaidlink-ghost"
        >
          <GradientIcon
            src="/icons/connect-bank.svg"
            size={20}
            gradientCss="bg-[linear-gradient(90deg,#22D3EE_0%,#60A5FA_100%)]"
            activeGradientCss="bg-[linear-gradient(90deg,#67E8F9_0%,#93C5FD_100%)]"
          />
          <p className="hiddenl text-[16px] font-semibold text-foreground xl:block">
            Connect bank
          </p>
        </Button>
      ) : (
        <Button
          onClick={handleOpen}
          variant="outline"
          className="plaidlink-default"
        >
          <GradientIcon
            src="/icons/connect-bank.svg"
            size={20}
            gradientCss="bg-[linear-gradient(90deg,#22D3EE_0%,#60A5FA_100%)]"
            activeGradientCss="bg-[linear-gradient(90deg,#67E8F9_0%,#93C5FD_100%)]"
          />
          <p className="text-[16px] font-semibold sidebar-label text-accent-foreground">
            Connect bank
          </p>
        </Button>
      )}
      {null}
    </>
  );
};

export default PlaidLink;
