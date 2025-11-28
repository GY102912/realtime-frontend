import { useNavigate } from "react-router-dom";
import { useSignupForm } from "../../hooks/useSignupForm"
import FileInput from "../common/FileInput";
import TextInput from "../common/TextInput";
import Button from "../common/Button";

export default function SignupForm() {
    const navigate = useNavigate();
    const {
        profile, email, password, confirmPassword, nickname, 
        handleSubmit,
    } = useSignupForm(navigate);

    return (
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
                <FileInput 
                    label="프로필 이미지"
                    id="profile-image"
                    preview={profile.preview}
                    onChange={profile.onChange}
                    helperText={profile.helper}
                />
                <TextInput
                    label="이메일"
                    id="email"
                    type="email"
                    value={email.value}
                    placeholder="이메일을 입력하세요"
                    onChange={(e) => email.onChange(e.target.value)}
                    onBlur={(e) => email.onBlur(e.target.value)}
                    helperText={email.helper}
                />
                <TextInput
                    label="비밀번호"
                    id="password"
                    type="password"
                    value={password.value}
                    placeholder="비밀번호를 입력하세요"
                    onChange={(e) => password.onChange(e.target.value)}
                    onBlur={(e) => password.onBlur(e.target.value)}
                    helperText={password.helper}
                />
                <TextInput
                    label="비밀번호 확인"
                    id="confirm-password"
                    type="password"
                    value={confirmPassword.value}
                    placeholder="비밀번호를 한 번 더 입력하세요"
                    onChange={(e) => confirmPassword.onChange(e.target.value)}
                    onBlur={(e) => confirmPassword.onBlur(e.target.value)}
                    helperText={confirmPassword.helper}
                />
                <TextInput
                    label="닉네임"
                    id="nickname"
                    type="nickname"
                    value={nickname.value}
                    placeholder="닉네임을 입력하세요"
                    onChange={(e) => nickname.onChange(e.target.value)}
                    onBlur={(e) => nickname.onBlur(e.target.value)}
                    helperText={nickname.helper}
                />
            </div>
            
            <div className="flex flex-col gap-4 mt-4">
                <Button type="submit" variant="btn-primary" className="w-full">회원가입</Button>
                
                <Button
                    type="button"
                    variant="btn-link"
                    className="w-full"
                    onClick={() => navigate("/login")}
                >로그인</Button>
            </div>
        </form>
    );
}