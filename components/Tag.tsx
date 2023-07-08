import Link from "next/link";

const Tag = ({ text, href }: { text: string; href: string }) => {
  return (
    <Link href={href}>
      <span className="mr-3 text-sm font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
        {text.split(" ").join("-")}
      </span>
    </Link>
  );
};

export default Tag;
