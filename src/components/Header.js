export default function Header() {
  return (
    <>
      <header id="header" className="header">
        <span>{new Date().getFullYear()}</span>
        <h1 className="title">{new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date())}</h1>
      </header>
    </>
  );
}
