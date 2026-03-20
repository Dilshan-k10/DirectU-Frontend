const FieldError = ({ message }) => {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1 text-red-400 text-xs mt-1 ml-1">
      <span className="material-symbols-outlined text-[14px]">error</span>
      {message}
    </p>
  );
};

export default FieldError;
