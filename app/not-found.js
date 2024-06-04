import Link from "next/link";

export const metadata = {
  title: "Not Found | LWSKart",
  description:
    "LWSKart is an app that shows various products with various categories. Buy your desired products",
  openGraph: {
    images: [
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=Not-Found | LWSKart`,
    ],
  },
};
export default function NotFound({ params }) {
  return (
    <div className="flex flex-col items-center py-10">
      <div className="bg-gray-200 text-rose-500 p-5 rounded-lg">
        <h2 className="text-center text-2xl">Not Found</h2>
        <p>Could not find requested resource</p>
        <div className="pt-10 items-center flex flex-col">
          <Link
            className="bg-blue-300 text-blue-700 px-5 py-2 rounded-lg hover:bg-inherit"
            href="/"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
