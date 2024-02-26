
import ReactSwagger from './react-swagger';
import { getApiDocs } from '../../../swagger/swagger';
export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="">
      <ReactSwagger spec={spec} />
    </section>
  );
}