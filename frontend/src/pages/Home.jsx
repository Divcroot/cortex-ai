import { FcGoogle } from "react-icons/fc";
import ArtifactPanel from "../components/ArtifactPanel";
import ChatArea from "../components/ChatArea";
import Sidebar from "../components/Sidebar";
import api from "../utils/axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useUser } from "../context/UserContext";

const Home = () => {
  const { userData, setUserData } = useUser();

  const login = async (token) => {
    try {
      const { data } = await api.post(`/api/auth/login`, { token });

      setUserData(data.user);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGoogleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);

    const token = await result.user.getIdToken();

    await login(token);
  };

  return (
    <div className="h-screen flex bg-[#0d0f14] text-white overflow-hidden">
      <Sidebar />
      <ChatArea />
      <ArtifactPanel />

      {!userData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-85 bg-[#13151c] border border-white/8 rounded-2xl p-7 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h2 className="text-[17px] font-semibold text-slate-100 tracking-tight">
                Welcome to CortexAI
              </h2>
              <p className="text-[13px] text-slate-500">
                Please login to continue using the app.
              </p>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 py-2.75 rounded-xl text-sm font-medium text-white bg-linear-to-br from-indigo-500 to-violet-700 hover:from-indigo-400 hover:to-violet-600 active:from-indigo-600 active:to-violet-800 border border-indigo-500/30 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-150 cursor-pointer"
            >
              <FcGoogle size={15} className="text-white" />
              Continue with Google
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
