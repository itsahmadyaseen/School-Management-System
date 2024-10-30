import Dashboard_Card from "./Dashboard_Card";
import Welcome_Card from "./Welcome_Card";
import Calendar from "./Calender";
import Student_Table from "./Student_Table";

const Dashboard = () => {
  return (
    <div
      className="flex "
      style={{ height: "calc(100vh - 104px)" }}
    >
      <div className="w-3/5">
        <div className="flex">
          <div className="m-2">
            <Welcome_Card />
          </div>
          <div className="flex">
            <div className="m-2">
              <Dashboard_Card
                img="https://static.vecteezy.com/system/resources/previews/008/154/360/non_2x/student-logo-vector.jpg"
                topic={"Student"}
                totalCount={1234}
              />
            </div>
            <div className="m-2">
              <Dashboard_Card
                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUgPuFMoqcbT9HuTtsUrujn57xjYciwbmVFA&s"
                topic={"Teacher"}
                totalCount={1234}
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Student_Table />
        </div>
      </div>
      <div className="calender w-2/5 bg-blue-200 ">
        <Calendar />
      </div>
    </div>
  );
};

export default Dashboard;
