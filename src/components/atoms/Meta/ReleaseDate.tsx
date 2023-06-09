interface ReleaseDateProps {
  ReleaseDate: Date;
}
const ReleaseDate = ({ ReleaseDate }: ReleaseDateProps) => {
  const ReleaseYear = new Date(ReleaseDate).getFullYear();

  return isNaN(ReleaseYear) ? null : <span>{ReleaseYear}</span>;
};

export default ReleaseDate;
