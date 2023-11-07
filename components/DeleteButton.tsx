import { Button } from "@nextui-org/react";
import React from "react";
import { MdDelete } from "react-icons/md";
export default function DeleteButton() {
  return (
    <div>
      <Button color="danger" variant="shadow">
        <MdDelete />
        Delete
      </Button>
    </div>
  );
}
