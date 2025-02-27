import React from "react";

function HeaderBox({ title = "title", type, user, subtext }: HeaderBoxProps) {
  return (
    <header className="header-box">
      <h1 className="header-box-title">
        {title}
        {type === "greeting" && (
          <span className="text-bankGradient">&nbsp;{user}</span>
        )}
      </h1>
      <p className="header-box-subtext">{subtext}</p>
    </header>
  );
}

export default HeaderBox;
