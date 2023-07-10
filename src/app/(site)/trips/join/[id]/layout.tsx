const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full max-w-3xl m-auto">{children}</div>
  );
};
export default layout;
