import { Editor } from "@tinymce/tinymce-react";
import { Control, Controller } from "react-hook-form";
import { conf } from "../conf";

type Props = {
  control?: Control;
};

export default function PostEditor({ control }: Props) {
  return (
    <div className="w-full">
      <Controller
        name="content"
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            onEditorChange={onChange}
            apiKey={conf.appwriteTinyMCEApiKey}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
            }}
          />
        )}
      />
    </div>
  );
}
