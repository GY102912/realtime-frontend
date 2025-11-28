import { usePostForm } from "../../hooks/usePostForm";
import TextInput from "../common/TextInput";
import TextArea from "../common/TextArea";
import Button from "../common/Button";

export default function PostForm({ onSubmit, submitText = "등록", loading, initialVal = null }) {
  const {
    title, content, images,
    handleChangeImages,
    handleSubmit,
  } = usePostForm(onSubmit, initialVal);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-10">

      <TextInput
        id="post-title"
        label="제목*"
        value={title.value}
        placeholder="제목을 입력해주세요."
        onChange={(e) => title.onChange(e.target.value)}
        onBlur={() => title.onBlur(title.value)}
        helperText={title.helper}
      />

      <TextArea
        id="post-content"
        label="내용*"
        rows={8}
        value={content.value}
        placeholder="내용을 입력해주세요."
        onChange={(e) => content.onChange(e.target.value)}
        onBlur={() => content.onBlur(content.value)}
        helperText={content.helper}
      />

      <div className="form-control w-full max-w-xl">
        <label className="label">
          <span className="label-text font-semibold">이미지</span>
        </label>

        <input
          type="file"
          accept="image/*"
          multiple
          className="file-input file-input-bordered w-full"
          onChange={handleChangeImages}
        />

        {images.length > 0 &&
          <p className="text-sm mt-2">{images.length} 개의 이미지 선택됨</p>}
      </div>

      <Button type="submit" disabled={loading} className="w-72 mt-4">
        {loading ? "저장 중..." : submitText}
      </Button>
    </form>
  );
}
