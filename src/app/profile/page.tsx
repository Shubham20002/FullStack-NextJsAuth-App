import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface TokenData {
  id: string;
  username: string;
  email: string;
}

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let user: TokenData | null = null;

  if (token) {
    try {
      user = jwt.verify(token, process.env.JWT_SECRET!) as TokenData;
    } catch (error) {
      console.error("Token verification failed", error);
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl text-red-500">Unauthorized. Please login first.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Username:</h2>
            <p className="text-gray-700">{user.username}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Email:</h2>
            <p className="text-gray-700">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
