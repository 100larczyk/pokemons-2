import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home(props) {
  // js start
  console.log(props);
  if (props.error) {
    return <div>{props.error}</div>;
  }
  // js end

  return (
    <div>
      {props.pokemon.name} <br />
      <img src={props.pokemon.image} />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const pokemonName = ctx.query.pokemon;

  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

  const response = await fetch(apiUrl);
  if (response.status === 404) {
    return { props: { error: "nie znaleziono pokemona" } };
  }

  const body = await response.json();
  // console.log(body);

  const pokemon = {
    name: body.name,
    image: body.sprites.front_default,
  };

  return {
    props: {
      pokemon: pokemon,
    },
  };
}
