import { useState, useEffect } from "react";
import useTitleField from "./useTitleField";
import useContentField from "./useContentField";

export function usePostForm(onSubmit, initialVal) {
  const title = useTitleField("");
  const content = useContentField("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (initialVal) {
      if (initialVal.title) title.onChange(initialVal.title);
      if (initialVal.content) content.onChange(initialVal.content);
      // TODO: 새로운 파일은 업로드 후 링크를 모으고 기존 파일 링크는 초기값에 넣기
    }
  }, [initialVal]);

  const handleChangeImages = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      title: title.value,
      content: content.value,
      images,
    });
  };

  return {
    title,
    content,
    images,
    handleChangeImages,
    handleSubmit,
  };
}
