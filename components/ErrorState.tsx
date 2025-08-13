type ErrorStateProps = {
  title?: string;
  message?: string;
  retryHref?: string;
};

export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load your data. Please try again.",
  retryHref = "/",
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-4 rounded-lg border border-red-200 bg-red-50 p-6 text-center">
      <h2 className="text-20 font-semibold text-red-800">{title}</h2>
      <p className="text-14 text-red-700">{message}</p>
      <a
        href={retryHref}
        className="text-14 rounded-md border border-red-300 bg-white px-4 py-2 font-semibold text-red-700 hover:bg-red-100"
      >
        Retry
      </a>
    </div>
  );
}
