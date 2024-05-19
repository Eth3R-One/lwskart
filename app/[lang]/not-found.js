import Link from "next/link";

export default function NotFound() {
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
