const OGImage = ({ title, body }) => {
  return (
    <div
      tw="bg-gray-400 rounded-xl h-full w-full flex flex-col items-center justify-center"
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 32,
        fontWeight: 600,
      }}
    >
      <svg
        width="75"
        viewBox="0 0 75 65"
        fill="#000"
        style={{ margin: "0 75px" }}
      >
        <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
      </svg>
      <div style={{ marginTop: 40 }} tw="text-[#eb4a36] text-5xl">
        {title}
      </div>
      <div tw="text-l text-center">{body}</div>
    </div>
  );
};

export default OGImage;
