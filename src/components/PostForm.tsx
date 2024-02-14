import { useCallback } from "react";
import { useForm } from "react-hook-form";
import PostEditor from "./PostEditor";
import { service } from "../appwrite/config";
import { useAppSelector, useAppDispatch } from "../redux/store";

export default function PostForm() {
  const { register, handleSubmit, getValues, control, setValue, watch } =
    useForm();

  const dispatch = useAppDispatch();
  return (
    <div>
      <PostEditor control={control} />
    </div>
  );
}
