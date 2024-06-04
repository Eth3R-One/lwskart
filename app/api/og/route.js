import OGImage from "@/components/OGImage";
import { ImageResponse } from "next/og";
export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  try {
    var title = searchParams.get("title") ?? "LWSKart";
    if (title.includes("-")) {
      title = deSlugify(title);
    }
    const body =
      searchParams.get("body") ??
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis ab illum quibusdam quis. Alias rem laudantium amet";

    return new ImageResponse(<OGImage title={title} body={body} />, {
      width: 1200,
      height: 600,
    });
  } catch (err) {
    return new ImageResponse(
      <OGImage title="Can not generate preview image" body={body} />,
      {
        width: 1200,
        height: 600,
      }
    );
  }
}
