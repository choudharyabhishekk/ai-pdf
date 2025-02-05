import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>AI PDF Generator</h1>
      <p>Generate PDFs with AI</p>
      <Image
        src="/ai-pdf-generator.png"
        alt="AI PDF Generator"
        width={500}
        height={500}
      />
    </div>
  );
}
