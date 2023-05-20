interface ReleaseDateProps {
  ReleaseDate: Date;
}
const ReleaseDate: React.FC<ReleaseDateProps> = ({ ReleaseDate }) => {
  const ReleaseYear = new Date(ReleaseDate).getFullYear();

  return isNaN(ReleaseYear) ? null : <span>{ReleaseYear}</span>;
};

export default ReleaseDate;
