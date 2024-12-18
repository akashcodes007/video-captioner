export default function validateURL(url: string) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
  