import { useForm } from "react-hook-form";
import PostEditor from "./PostEditor";

export default function PostForm() {
  const { control } = useForm();

  return (
    <div>
      <PostEditor control={control} />
    </div>
  );
}
