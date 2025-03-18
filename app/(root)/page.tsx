import react from "react";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { Chart } from "@/components/Chart";


const Dashboard = async () => {

  const [files, totalSpace] = await Promise.all([getFiles({ types: [], limit: 10 }), getTotalSpaceUsed()]);

  return (
    <div>
      <div className="dashboard-container">
        <section>
          <Chart used={totalSpace.used} />
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
