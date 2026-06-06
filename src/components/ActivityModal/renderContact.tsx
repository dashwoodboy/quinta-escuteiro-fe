const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const PHONE_RE = /(?:\+351\s?)?\d{3}(?:\s?\d{3}){2,}/;

export function renderContactText(contact: string) {
  const email = contact.match(EMAIL_RE)?.[0];
  const phone = contact.match(PHONE_RE)?.[0];

  if (email) {
    const [before, after] = contact.split(email);
    return (
      <>
        {before.trimEnd()}
        {before && ' '}
        <a href={`mailto:${email}`}>{email}</a>
        {after.trimStart() && ` ${after.trimStart()}`}
      </>
    );
  }

  if (phone) {
    const tel = phone.replace(/\s/g, '');
    const [before, after] = contact.split(phone);
    return (
      <>
        {before.trimEnd()}
        {before && ' '}
        <a href={`tel:${tel}`}>{phone}</a>
        {after.trimStart() && ` ${after.trimStart()}`}
      </>
    );
  }

  return contact;
}
