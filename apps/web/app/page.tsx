import { Button } from "@workspace/ui/components/button"
import {ProductsApi, Configuration} from "@workspace/next-client"


// Configuracion de la api, se puede externalizar a un archivo de configuracion o usar variables de entorno
const config = new Configuration({
  basePath: "http://localhost:3500/api/v1",
})

const fetchProducts = async () => {

  // Clase expuesta por el package generado, se puede usar en cualquier parte del codigo, incluso en el backend si es necesario
  const api = new ProductsApi(config);
  const products = await api.listProducts();
  console.log(products);
}

export default async function Page() {
  await fetchProducts();
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <div className="flex gap-2">
          <Button>Button</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </div>
    </div>
  )
}
