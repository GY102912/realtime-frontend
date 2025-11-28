import { useNavigate } from "react-router-dom";
import { useLoginForm } from "../../hooks/useLoginForm";
import TextInput from "../common/TextInput";
import Button from "../common/Button";

export default function LoginForm() {
    const navigate = useNavigate();
    const { email, password, handleSubmit } = useLoginForm(navigate);

    return (
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
                <TextInput
                    label="이메일"
                    id="email"
                    type="email"
                    value={email.value}
                    placeholder="이메일 입력"
                    onChange={(e) => email.onChange(e.target.value)}
                    onBlur={(e) => email.onBlur(e.target.value)}
                    helperText={email.helper}
                />
                <TextInput
                    label="비밀번호"
                    id="password"
                    type="password"
                    value={password.value}
                    placeholder="비밀번호 입력"
                    onChange={(e) => password.onChange(e.target.value)}
                    onBlur={(e) => password.onBlur(e.target.value)}
                    helperText={password.helper}
                />
            </div>
            
            <div className="flex flex-col gap-4 mt-4">
                <Button type="submit" variant="btn-primary" className="w-full">로그인</Button>

                <Button
                    type="button"
                    variant="btn-link"
                    className="w-full"
                    onClick={() => navigate("/signup")}
                >회원가입</Button>
            </div>
            
        </form>
    );
}
