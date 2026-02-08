import { useParams, useNavigate } from "react-router-dom";
import { doctors } from "../data/doctorsData";
import { Heading } from "../components";
import {
  Card,
  Button,
  Tag,
  Rate,
  Tabs,
  Row,
  Col,
  Avatar,
  Space,
  List,
  Typography,
  Alert,
} from "antd";
import {
  CheckCircleFilled,
  EnvironmentFilled,
  ClockCircleFilled,
  LeftOutlined,
  StarFilled,
  DashboardOutlined,
  CalendarOutlined,
  HomeOutlined,
  LikeOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  RightOutlined,
  MedicineBoxOutlined,
  CompassOutlined,
  TrophyFilled,
} from "@ant-design/icons";
import { FaUserDoctor } from "react-icons/fa6";
import { LuAtom } from "react-icons/lu";
import { FaMapMarkerAlt, FaRegClock, FaStethoscope } from "react-icons/fa";
import { IoCalendarNumber } from "react-icons/io5";

const { Title, Text, Paragraph } = Typography;

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find((d) => d.id === id);

  if (!doctor) {
    return (
      <div className="p-4">
        <Alert
          message="Doctor Not Found"
          description="The requested doctor profile could not be found."
          type="error"
          showIcon
          action={<Button onClick={() => navigate(-1)}>Go Back</Button>}
        />
      </div>
    );
  }

  // Mock data for reviews
  const reviews = [
    {
      user: "Test User",
      rating: 5,
      date: "2 days ago",
      comment:
        "Thank you for the warm and professional experience. The doctor was very patient and explained everything clearly.",
      verified: true,
    },
    {
      user: "Divya Jose",
      rating: 4,
      date: "1 week ago",
      comment:
        "Good experience overall. Wait time was a bit long but the treatment was excellent.",
      verified: true,
    },
  ];

  const items = [
    {
      key: "overview",
      label: "Overview",
      children: (
        <div className="space-y-10 py-6 px-2">
          {/* Doctor Bio */}
          <section
            id="bio"
            className="bg-gradient-to-br from-blue-50/50 to-white p-8 rounded-3xl border border-blue-100/50 shadow-sm relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-blue-200/30 transition-all duration-500"></div>
            <div className="flex items-center  gap-3 mb-6">
              <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
                <FaUserDoctor color="#ffffff" size={22} />
              </div>
              <h2 className="m-0 text-slate-700 text-3xl font-semibold">
                Doctor Bio
              </h2>
            </div>
            <summary></summary>
            <Paragraph className="text-[#6b7280] text-[16px] leading-[1.8] mb-6 italic font-medium">
              "{doctor.name} is a highly motivated and experienced doctor with a
              passion for providing excellent care to patients. Experienced in a
              wide variety of medical settings, with particular expertise in
              diagnostics, primary care and emergency medicine. Skilled in using
              the latest technology to streamline patient care. Committed to
              delivering compassionate, personalized care to each and every
              patient."
            </Paragraph>
            <div className="flex items-center justify-between">
              <Button
                type="link"
                className="p-0 h-auto text-blue-600 font-bold flex items-center gap-1.5 hover:gap-3 transition-all"
              >
                Read Full Biography <RightOutlined className="text-[10px]" />
              </Button>
            </div>
          </section>

          {/* Practice Experience */}
          <section id="experience" className="px-2">
            <div className="flex items-center  gap-3 mb-6">
              <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
                <FaStethoscope color="#ffffff" size={22} />
              </div>
              <h2 className="m-0 text-slate-700 text-3xl font-semibold">
                Practice Experience
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  hospital: doctor.medicalCollege,
                  logo: doctor.collegeImgLink,
                  subHosp: "Primary Medical Institution",
                  dept: doctor.department,
                  location:
                    doctor.permanentAddress.split(",").pop()?.trim() || "India",
                  period: `Graduated in ${doctor.yearOfGraduation}`,
                  duration: `${doctor.totalExperience} Years`,
                  desc: `Specialized in ${doctor.specialization.join(", ")} with a focus on advanced patient care and clinical excellence.`,
                },
                {
                  logo: "https://doccure.dreamstechnologies.com/html/template/assets/img/icons/experience-logo-01.svg",
                  hospital: "Affiliated Medical Center",
                  subHosp: "Regional Health Care",
                  dept: "General Consultation",
                  location: "Local Practice",
                  period: "Current Practice",
                  duration: "Active",
                  desc: "Providing comprehensive medical services and emergency care to the community.",
                },
              ].map((exp, idx) => (
                <div
                  key={idx}
                  className="flex flex-col p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 p-3 shadow-inner">
                      <img
                        src={exp.logo}
                        alt="Hospital Logo"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="m-0 text-2xl text-slate-600 font-semibold tracking-wide ">
                        {exp.hospital}
                      </p>
                      <p className="m-0 text-lg text-slate-500 font-medium tracking-wide leading-tight">
                        {exp.subHosp}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-1 border-b border-gray-50">
                      <div className="flex items-center gap-2">
                        <MedicineBoxOutlined className="text-blue-500" />
                        <Text className="text-[#4b5563] font-semibold">
                          {exp.dept}
                        </Text>
                      </div>
                      <Tag
                        color="blue"
                        className="m-0 rounded-full border-none font-bold text-[10px]"
                      >
                        {exp.duration}
                      </Tag>
                    </div>
                    <div className="flex items-center gap-2 text-[#6b7280] text-sm font-medium">
                      <CompassOutlined className="text-gray-400" />
                      <span>{exp.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#9ca3af] text-xs font-semibold">
                      <CalendarOutlined className="text-gray-300" />
                      <span>{exp.period}</span>
                    </div>
                    <Paragraph className="m-0 mt-2 text-[#6b7280] text-[13px] leading-relaxed line-clamp-2">
                      {exp.desc}
                    </Paragraph>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Speciality Badge Grid */}
          <section
            id="speciality"
            className="p-8 rounded-3xl bg-gray-50 border border-gray-100"
          >
            <div className="flex items-center  gap-3 mb-8">
              <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
                <LuAtom color="#ffffff" size={22} />
              </div>
              <h2 className="m-0 text-slate-700 text-3xl font-semibold">
                Core Specialities
              </h2>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {doctor.specialization.map((spec, idx) => {
                const colors = [
                  { color: "#3b82f6", bg: "#eff6ff" },
                  { color: "#10b981", bg: "#ecfdf5" },
                  { color: "#f59e0b", bg: "#fffbeb" },
                  { color: "#8b5cf6", bg: "#f5f3ff" },
                  { color: "#ec4899", bg: "#fdf2f8" },
                  { color: "#6366f1", bg: "#eef2ff" },
                ];
                const theme = colors[idx % colors.length];
                return (
                  <div
                    key={idx}
                    style={{
                      borderLeft: `4px solid ${theme.color}`,
                      backgroundColor: theme.bg,
                    }}
                    className=" px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-center justify-center gap-4"
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: theme.color }}
                    ></div>
                    <p className="text-sm font-medium text-slate-700">{spec}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Availability Carousel Style */}
          <section
            id="availability"
            className="p-8 rounded-3xl border-2 border-dashed border-gray-200 bg-white"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center  gap-3 mb-6">
                <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
                  <IoCalendarNumber color="#ffffff" size={22} />
                </div>
                <h2 className="m-0 text-slate-700 text-3xl font-semibold">
                  Appointment Slots
                </h2>
              </div>

              <div className="flex gap-3">
                <Button
                  shape="circle"
                  size="large"
                  icon={<LeftOutlined />}
                  className="hover:text-blue-600 hover:border-blue-600 shadow-sm transition-all"
                />
                <Button
                  shape="circle"
                  size="large"
                  icon={<RightOutlined />}
                  className="hover:text-blue-600 hover:border-blue-600 shadow-sm transition-all"
                />
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {doctor.opdDays.map((day, idx) => (
                <div
                  key={idx}
                  className={`min-w-50 p-4 rounded-2xl border ${idx === 0 ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-100" : "border-gray-100 bg-gray-50/50"} text-center hover:border-blue-300 hover:bg-white transition-all cursor-pointer`}
                >
                  <p
                    className={`block font-semibold mb-2 ${idx === 0 ? "text-blue-700" : "text-slate-600"}`}
                  >
                    {day}
                  </p>
                  <div
                    className={`px-3 py-1 rounded-lg inline-block ${idx === 0 ? "bg-blue-100 text-blue-700" : "bg-gray-50 text-slate-600"}`}
                  >
                    <p className="text-sm font-medium uppercase tracking-wide">
                      {doctor.consultationTiming}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Clinics & Locations Enhanced */}
          <section id="clinics" className="px-2">
            <div className="flex items-center  gap-3 mb-6">
              <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
                <IoCalendarNumber color="#ffffff" size={22} />
              </div>
              <h2 className="m-0 text-slate-700 text-3xl font-semibold">
                Clinical Presence
              </h2>
            </div>

            <div className="p-2 rounded-[32px] bg-gradient-to-br from-gray-100 to-white shadow-xl shadow-gray-200/50 border border-gray-100/50">
              <div className="p-8 rounded-[28px] bg-white border border-gray-100">
                <div className="flex flex-col lg:flex-row gap-10">
                  <div className="flex-grow space-y-8">
                    <div className="flex items-start gap-6">
                      <div className="w-24 h-24 rounded-[20px] overflow-hidden shadow-lg border-2 border-white ring-1 ring-gray-100">
                        <img
                          src={doctor.collegeImgLink}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="pt-2">
                        <p className="m-0 mb-1 text-xl text-blue-900 font-semibold">
                          {doctor.medicalCollege.split(",")[0]} Professional
                          Clinic
                        </p>
                        <div className="flex items-center gap-2 mb-2">
                          <Tag
                            color="cyan"
                            className="m-0 px-3 py-1 rounded-lg border-none font-bold text-xs"
                          >
                            ₹ {doctor.consultationFee} / Session
                          </Tag>
                          <Text className="text-[#9ca3af] font-black">•</Text>
                          <Text className="text-gray-500 font-medium text-xs">
                            Modern Facilities
                          </Text>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-100 mt-4">
                          <EnvironmentOutlined className="text-blue-500" />
                          <Text className="text-[13px] font-medium italic">
                            {doctor.permanentAddress}
                          </Text>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {doctor.opdDays.slice(0, 2).map((day, idx) => (
                        <div
                          key={day}
                          className="p-5 rounded-2xl border border-gray-100 bg-white relative overflow-hidden group hover:border-blue-200 transition-all"
                        >
                          <div
                            className={`absolute top-0 right-0 w-12 h-12 bg-${idx === 0 ? "blue" : "cyan"}-50 rounded-bl-3xl -mr-4 -mt-4 opacity-0 group-hover:opacity-100 transition-all`}
                          ></div>
                          <p className="block text-gray-400 font-medium text-sm uppercase tracking-widest mb-1">
                            {day}
                          </p>
                          <div className="flex items-center gap-2">
                            <FaRegClock
                              className={`text-${idx === 0 ? "blue" : "cyan"}-500`}
                            />
                            <p className="text-gray-600 font-semibold text-sm tracking-tight">
                              {doctor.consultationTiming}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button
                      type="primary"
                      size="large"
                      block
                      className="h-14 rounded-2xl shadow-lg shadow-blue-100 bg-blue-600 font-bold tracking-tight"
                    >
                      Get Directions to Clinic
                    </Button>
                  </div>

                  <div className="w-full lg:w-[42%] h-[400px] lg:h-auto rounded-[24px] overflow-hidden relative border-4 border-white shadow-2xl group">
                    <img
                      src="https://via.placeholder.com/600x600/eef2f3/1e3a8a?text=Interactive+Medical+Care+Map"
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:scale-110 transition-all duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-blue-900/5"></div>
                    <div className="absolute top-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-2xl border border-white">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
                          <FaMapMarkerAlt className="text-white" />
                        </div>
                        <div className="flex items-center justify-between w-full">
                          <p className="block text-blue-900 text-base font-medium">
                            Delhi, India
                          </p>
                          <Button type="primary">
                            View on Map
                            <RightOutlined className="text-[10px]" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ),
    },
    {
      key: "locations",
      label: "Locations",
      children: (
        <div className="space-y-4">
          {[
            {
              name: `${doctor.medicalCollege.split(",")[0]} Professional Clinic`,
              address: doctor.permanentAddress,
              timings: doctor.consultationTiming,
              price: `₹ ${doctor.consultationFee} / Session`,
            },
          ].map((clinic, idx) => (
            <Card key={idx} bordered={false} className="shadow-sm">
              <Row gutter={16}>
                <Col span={6}>
                  <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                    Map View
                  </div>
                </Col>
                <Col span={18}>
                  <Title level={5}>{clinic.name}</Title>
                  <Space direction="vertical" size={2}>
                    <Text type="secondary">
                      <EnvironmentFilled /> {clinic.address}
                    </Text>
                    <Text type="secondary">
                      <ClockCircleFilled /> {clinic.timings}
                    </Text>
                    <Text strong className="text-blue-600">
                      {clinic.price}
                    </Text>
                  </Space>
                  <div className="mt-4">
                    <Button type="primary" size="small">
                      Book Appointment
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card>
          ))}
        </div>
      ),
    },
    {
      key: "reviews",
      label: "Reviews",
      children: (
        <div className="flex flex-col gap-4 px-10">
          {reviews.map((review, idx) => (
            <Card key={idx} className="shadow-sm">
              <List.Item.Meta
                title={
                  <div className="flex justify-between">
                    <div className="flex flex-row items-center  gap-1">
                      <Avatar className="shadow-sm"
                        src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${idx}&doctor=${doctor.id}`}
                        size={40}
                      />
                      <p className="text-md font-medium">{review.user}</p>
                    </div>
                    <Text type="secondary" className="text-xs">
                      {review.date}
                    </Text>
                  </div>
                }
                description={
                  <Space direction="vertical" size={2}>
                    <Rate
                      disabled
                      defaultValue={review.rating}
                      style={{ fontSize: 12 }}
                    />
                    {review.verified && (
                      <Text type="success" className="text-xs">
                        <CheckCircleFilled /> Verified Appointment for{" "}
                        {doctor.name}
                      </Text>
                    )}
                    <Paragraph className="mt-2 mb-0 text-gray-600">
                      {review.comment}
                    </Paragraph>
                  </Space>
                }
              />
            </Card>
          ))}
        </div>
      ),
    },
    {
      key: "hours",
      label: "Business Hours",
      children: (
        <Card bordered={false} className="shadow-sm">
          <List
            dataSource={doctor.opdDays}
            renderItem={(day) => {
              const isToday =
                day ===
                new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
                  new Date(),
                );
              return (
                <List.Item className={isToday ? "bg-blue-50/50" : ""}>
                  <div className="flex justify-between w-full">
                    <Space>
                      <Text strong className={isToday ? "text-blue-600" : ""}>
                        {day}
                      </Text>
                      {isToday && (
                        <Tag color="blue" className="text-[10px] m-0">
                          Today
                        </Tag>
                      )}
                    </Space>
                    <Text
                      className={isToday ? "text-blue-600 font-medium" : ""}
                    >
                      {doctor.consultationTiming}
                    </Text>
                  </div>
                </List.Item>
              );
            }}
          />
        </Card>
      ),
    },
  ];

  return (
    <>
      <Heading title="Doctor Profile" />
      <div className="p-4 bg-gray-50 min-h-screen">
        <Button
          icon={<LeftOutlined />}
          type="text"
          className="mb-4 text-gray-600 hover:text-blue-600"
          onClick={() => navigate(-1)}
        >
          Back to List
        </Button>
        <div className="p-4 bg-gray-50 font-sans">
          <Card
            className="rounded-xl border-gray-200 shadow-sm overflow-hidden"
            bodyStyle={{ padding: "24px" }}
          >
            {/* Top Section */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Image */}
              <div className="w-full md:w-40 h-40 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                <img
                  src={`https://xsgames.co/randomusers/avatar.php?g=${doctor.gender === "Female" ? "female" : "male"}&key=${doctor.id}`}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 justify-between w-full  p-2 rounded-md">
                {/* Info Section */}
                <div className="grow">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <Tag
                      color="cyan"
                      className="rounded-full px-3 py-0.5 border-none bg-[#e1f9f9] text-[#20c0be] font-medium flex items-center gap-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#20c0be]"></span>{" "}
                      Available
                    </Tag>
                  </div>

                  <div className="flex items-center gap-2 mb-1">
                    <Title level={4} className="m-0 text-[#272b41]! font-bold!">
                      {doctor.name}
                    </Title>
                    <CheckCircleFilled className="text-[#1db9aa] text-lg" />
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded border border-gray-200 bg-white ml-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      <Text className="text-xs text-gray-600">
                        {doctor.department}
                      </Text>
                    </div>
                  </div>

                  <p className="text-[#757575] block mb-2 text-sm">
                    {doctor.primaryQualification} -{" "}
                    {doctor.specialization.join(", ")}
                  </p>

                  <p className=" block mb-2 text-sm">
                    Speaks : English, Hindi, local languages
                  </p>

                  <div className="flex items-center gap-1 text-[#757575] mb-4">
                    <EnvironmentOutlined className="text-xs" />
                    <p className="text-sm">
                      {doctor.permanentAddress} ({" "}
                      <a href="#" className="text-[#007bff] hover:underline">
                        View Location
                      </a>{" "}
                      )
                    </p>
                  </div>
                </div>

                {/* Stats & Verification Section */}
                <div className="grow flex flex-col  gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#f0f9f8] flex items-center justify-center text-[#1db9aa]">
                      <ClockCircleOutlined />
                    </div>
                    <Text className="text-[#272b41] text-sm">
                      Full Time, Online Therapy Available
                    </Text>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#e8f1ff] flex items-center justify-center text-[#007bff]">
                      <LikeOutlined />
                    </div>
                    <Text className="text-[#272b41] text-sm font-medium">
                      94%{" "}
                      <span className="text-[#757575] font-normal">
                        Recommended
                      </span>
                    </Text>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#f8f0ff] flex items-center justify-center text-[#9c27b0]">
                      <HomeOutlined />
                    </div>
                    <Text className="text-[#272b41] text-sm">
                      {doctor.medicalCollege}
                    </Text>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                      <TrophyFilled />
                    </div>
                    <Text className="text-[#272b41] text-sm font-medium">
                      {doctor.totalExperience} Years{" "}
                      <span className="text-[#757575] font-normal">
                        of Experience
                      </span>
                    </Text>
                  </div>

                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <StarFilled key={s} className="text-[#ffba45] text-sm" />
                    ))}
                    <Text className="ml-1 text-[#272b41] font-bold">5.0</Text>
                    <Text className="ml-1 text-[#757575] border-b border-[#757575] leading-none cursor-pointer">
                      150 Reviews
                    </Text>
                  </div>
                </div>
              </div>

              {/* Action Icons Section */}
              {/* <div className="flex flex-col items-end gap-12">
                                <div className="flex gap-2">
                                    <Button
                                        shape="circle"
                                        icon={<HeartOutlined />}
                                        className="border-gray-200 text-gray-400"
                                    />
                                    <Button
                                        shape="circle"
                                        icon={<ShareAltOutlined />}
                                        className="border-gray-200 text-gray-400"
                                    />
                                    <Button
                                        shape="circle"
                                        icon={<LinkOutlined />}
                                        className="border-gray-200 text-gray-400"
                                    />
                                </div>
                            </div> */}
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-gray-100 my-6"></div>

            {/* Bottom Booking Section */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-[#00a2ef] flex items-center justify-center text-white text-lg">
                    <CalendarOutlined />
                  </div>
                  <Text className="text-[#272b41] font-medium">
                    Nearly 200+ Appointment Booked
                  </Text>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-[#0052ea] flex items-center justify-center text-white text-lg">
                    <DashboardOutlined />
                  </div>
                  <Text className="text-[#272b41] font-medium">
                    In Practice for {doctor.totalExperience} Years
                  </Text>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-[#84cf32] flex items-center justify-center text-white text-lg">
                    <StarFilled />
                  </div>
                  <Text className="text-[#272b41] font-medium">5+ Awards</Text>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Text className="text-[#272b41]">
                  Price :{" "}
                  <span className="font-bold">₹{doctor.consultationFee}</span>{" "}
                  for a Session
                </Text>
                <Button
                  type="primary"
                  className="bg-[#3070f3] hover:bg-[#2060e3] border-none h-12 px-10 rounded-full font-bold text-base"
                >
                  Book Appointment
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Content Tabs */}
        <div className="bg-white rounded-xl shadow-md p-2">
          <Tabs
            defaultActiveKey="overview"
            items={items}
            className="px-4"
            tabBarStyle={{ marginBottom: 24 }}
          />
        </div>
      </div>
    </>
  );
};

export default DoctorProfile;
