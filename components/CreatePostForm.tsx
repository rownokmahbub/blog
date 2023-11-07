"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Link,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { GiLinkedRings } from "react-icons/gi";
import { MdAddToPhotos, MdDelete, MdOutlineAddCircle } from "react-icons/md";
import { TCategory } from "@/app/types";
import { useRouter } from "next/navigation";
export default function CreatePostForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [links, setLinks] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await fetch("api/categories");
      const catNames = await res.json();
      setCategories(catNames);
    };

    fetchAllCategories();
  }, []);

  const addLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (linkInput.trim() !== "") {
      setLinks((prev) => [...prev, linkInput]);
      setLinkInput("");
    }
  };

  const deleteLink = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      const errorMessage = "Title and content are required";

      return;
    }

    try {
      const res = await fetch("api/posts/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          links,
          selectedCategory,
          imageUrl,
          publicId,
        }),
      });

      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button
        className="bg-gradient-to-r from-blue-500 via-cyan-600 to-blue-500 "
        radius="lg"
        size="md"
        onPress={onOpen}
        color="primary"
        variant="shadow"
      >
        <MdAddToPhotos />
        Create Post
      </Button>
      <Modal
        className="max-w-2xl bg-slate-900"
        backdrop="blur"
        isOpen={isOpen}
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
        isDismissable={false}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-purple-500 to-teal-500">
                  Create Your Post
                </p>
              </ModalHeader>
              <ModalBody className="py-10">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <Input
                    onChange={(e) => setTitle(e.target.value)}
                    label="Title"
                    variant="bordered"
                    type="text"
                    size="sm"
                  />
                  <Textarea
                    onChange={(e) => setContent(e.target.value)}
                    variant="bordered"
                    minRows={2}
                    label="Description"
                    labelPlacement="inside"
                    placeholder="Enter content here"
                  />
                  {links &&
                    links.map((link, i) => (
                      <div
                        className="bg-slate-800 text-cyan-400 font-medium gap-2 rounded-lg px-4 py-3 w-full flex justify-between items-center"
                        key={i}
                      >
                        <Link className="" href={link}>
                          <div className="flex items-center gap-2 cursor-pointer">
                            <GiLinkedRings />
                            {link}
                          </div>
                        </Link>
                        <div
                          onClick={() => deleteLink(i)}
                          className="bg-red-500 px-2 py-2 flex flex-shrink-0 rounded-md cursor-pointer"
                        >
                          <MdDelete className="text-red-50 text-lg" />
                        </div>
                      </div>
                    ))}
                  <div className="flex gap-2 items-center">
                    <Input
                      onChange={(e) => setLinkInput(e.target.value)}
                      value={linkInput}
                      label="Paste the link "
                      variant="bordered"
                      type="text"
                      size="sm"
                    />
                    <Button
                      onClick={addLink}
                      className="bg-cyan-500 text-sm"
                      color="primary"
                      variant="shadow"
                      size="lg"
                    >
                      <MdOutlineAddCircle />
                      Add
                    </Button>
                  </div>
                  <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-3 rounded-lg border-2 text-sm border-slate-200 dark:border-zinc-600 bg-transparent"
                  >
                    <option value="">Select A Category</option>
                    {categories &&
                      categories.map((category) => (
                        <option key={category.id} value={category.catName}>
                          {category.catName}
                        </option>
                      ))}
                  </select>

                  {error && <div className="text-lg text-red-500">{error}</div>}

                  <div className="flex justify-end items-center gap-2">
                    <Button color="danger" variant="shadow" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      onClick={onClose}
                      type="submit"
                      color="primary"
                      variant="shadow"
                    >
                      <MdAddToPhotos />
                      Create Post
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
