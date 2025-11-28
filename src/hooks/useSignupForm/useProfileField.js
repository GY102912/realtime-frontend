import { useState } from "react";

export default function useProfileField() {
    const [profile, setProfile] = useState(null);
    const [profilePreview, setProfilePreview] = useState("");
    const [profileHelper, setProfileHelper] = useState("");

    const handleChange = async ({file, preview}) => {
        setProfile(file);
        setProfilePreview(preview)

        if (!file) setProfileHelper("* 프로필 사진을 추가해주세요.");
        else setProfileHelper("");
    };

    return {
        file: profile,
        preview: profilePreview,
        helper: profileHelper,
        onChange: handleChange,
    };
}