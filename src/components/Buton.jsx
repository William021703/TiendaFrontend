export function Buton({ funcion, name, clase }) {
  return (
    <button className={clase} onClick={funcion}>
      {name}
    </button>
  );
}
