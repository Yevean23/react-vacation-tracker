import FullTable from "../../components/fulltable";
import * as apivacationtypes from "../../api/endpoints/vacation_types"

export default function ConfigPage() {

  return (
    <>
      <h1>Config</h1>
      <FullTable api={apivacationtypes}/>
    </>
  );
}
