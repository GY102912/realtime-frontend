import FormCard from "../components/common/FormCard";
import SignupForm from "../components/user/SignupForm";

export default function SignupPage() {
    return (
        <FormCard title="회원가입">
            <SignupForm />
        </FormCard>
    );
}