import { useForm } from "react-hook-form";
import PostEditor from "../components/PostEditor";
import Container from "../components/Container";

export default function AddPost() {
  const { control } = useForm();

  return (
    <Container>
      <PostEditor control={control} />
    </Container>
  );
}
