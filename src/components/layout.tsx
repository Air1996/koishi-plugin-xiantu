export default function (attrs, children, session) {
  let titleLength = 24;
  let borderChar = "";
  for (let index = 0; index < titleLength; index++) {
    borderChar += "=";
  }

  return (
    <>
      <quote id={session?.messageId}></quote>
      <p>{borderChar}</p>
      {children}
      <p>{borderChar}</p>
    </>
  );
}
