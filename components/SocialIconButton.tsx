import React from "react";
import { Button } from "./ui/button";
import { IconType } from "react-icons";

interface SocialIconButtonProps {
  icon: IconType;
  onClickFunction: () => void;
}

const SocialIconButton: React.FC<SocialIconButtonProps> = ({
  icon: Icon,
  onClickFunction,
}) => {
  return (
    <Button
      type="button"
      size={"sm"}
      variant={"outline"}
      className=" bg-white rounded-md flex-1"
      onClick={onClickFunction}
    >
      {" "}
      <Icon className="  w-2/3 h-2/3" />{" "}
    </Button>
  );
};

export default SocialIconButton;
