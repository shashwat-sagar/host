import { useEffect } from "react";
import {
  Heading,
  SubHeading,
  MasterTable,
  ScreenWrapper,
} from "../../components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaHandHoldingMedical, FaHandHoldingHeart } from "react-icons/fa";
import { Form, Row, Col, Radio, Button, message, Select, Tag } from "antd";
import {
  getSpecializationType,
  getlevelOfCare,
  getSpecializationFacilityList,
  getHospicalSpecDetail,
  saveHospitalSpeciality,
} from "../../services/api";
import { useAuthStore } from "../../store/auth.store";
import { ColumnsType } from "antd/es/table";

const getSpecializationTypeApi = async () => {
  const { data } = await getSpecializationType();
  return data;
};
const getlevelOfCareApi = async () => {
  const { data } = await getlevelOfCare();
  return data;
};
const getSpecializationFacilityListApi = async () => {
  const { data } = await getSpecializationFacilityList();
  return data;
};
const saveHospitalSpecialityApi = async (payload: any) => {
  const { data } = await saveHospitalSpeciality(payload);
  return data;
};
const getHospicalSpecDetailApi = async ({ queryKey }: any) => {
  const [, hospitalRegNo] = queryKey;
  const { data } = await getHospicalSpecDetail(hospitalRegNo);
  return data?.table;
};

const HospitalSpecialization = () => {
  const [form] = Form.useForm();
  const { user } = useAuthStore();
  const hospitalRegNo = user?.userId;

  const { data: getSpecializationData, isFetching: isSpecTypeLoading } =
    useQuery({
      queryKey: ["getSpecializationTypeApi"],
      queryFn: getSpecializationTypeApi,
      retry: 1,
      refetchOnWindowFocus: false,
    });

  const { data: getLevelData } = useQuery({
    queryKey: ["getlevelOfCareApi"],
    queryFn: getlevelOfCareApi,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const {
    data: SpecializationFacilityData,
    isFetching: isFacilityListLoading,
  } = useQuery({
    queryKey: ["getSpecializationFacilityListApi"],
    queryFn: getSpecializationFacilityListApi,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const { data: hospitalSpecialityData, isFetching: isDetailLoading } =
    useQuery({
      queryKey: ["getHospicalSpecDetailApi", hospitalRegNo],
      queryFn: getHospicalSpecDetailApi,
      enabled: !!hospitalRegNo,
      retry: 1,
      refetchOnWindowFocus: false,
    });

  useEffect(() => {
    if (!hospitalSpecialityData || hospitalSpecialityData.length === 0) return;

    const existingIds = hospitalSpecialityData.map((item: any) =>
      item.specializationId?.toString(),
    );

    const radioValues: Record<string, any> = {};
    SpecializationFacilityData?.forEach((item: any) => {
      const specId = item.value?.toString();
      if (!specId) return;
      radioValues[specId] = existingIds.includes(specId) ? 1 : 0;
    });

    const [firstEntry] = hospitalSpecialityData;
    if (firstEntry) {
      radioValues["specializations"] =
        firstEntry.specializationTypeId?.toString();
      radioValues["LevelOfCare"] = firstEntry.levelOfCareId?.toString();
    }

    form.setFieldsValue(radioValues);
  }, [hospitalSpecialityData, SpecializationFacilityData, form]);

  const columns: ColumnsType<any> = [
    {
      title: "Sr. No",
      align: "center",
      width: 80,
      render: (_text, _record, index) => index + 1,
    },
    {
      title: "Specialization Facility",
      align: "left",
      render: (_text, record) => (
        <span className="font-semibold text-slate-700">
          {record?.name || record?.label || "--"}
        </span>
      ),
    },
    {
      title: "Availability",
      align: "center",
      width: 200,
      render: (_text, record) => (
        <Form.Item
          style={{ margin: 0 }}
          name={record?.value}
          rules={[{ required: true, message: "Required" }]}
        >
          <Radio.Group buttonStyle="solid">
            <Radio.Button value={1} className="px-6">
              <Tag
                color="green"
                className="border-none bg-transparent m-0 p-0 text-inherit"
              >
                YES
              </Tag>
            </Radio.Button>
            <Radio.Button value={0} className="px-6">
              <Tag
                color="red"
                className="border-none bg-transparent m-0 p-0 text-inherit"
              >
                NO
              </Tag>
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
      ),
    },
  ];

  const { mutate: saveHospiatlSpec, isPending: saveHospitalSpecPending } =
    useMutation({
      mutationFn: saveHospitalSpecialityApi,
      onSuccess: (data) => {
        if (data?.status === true) {
          message.success(
            data?.message || "Specializations updated successfully",
          );
        } else {
          message.error(data?.message || "Unable to update the data");
        }
      },
      onError: () => {
        message.error("Error while updating Hospital Specialization");
      },
    });

  const handleSubmit = (values: any) => {
    const { specializations, LevelOfCare, ...radioValues } = values;

    const selectedSpecializations = Object.entries(radioValues)
      .filter(([_, val]) => val === 1)
      .map(([specIdStr]) => {
        const specId = parseInt(specIdStr, 10);
        const specMeta = SpecializationFacilityData?.find(
          (s: any) => parseInt(s.value) === specId,
        );
        const levelId = parseInt(LevelOfCare);
        const levelMeta = getLevelData?.find(
          (l: any) => parseInt(l.value) === levelId,
        );
        const specTypeId = specializations;
        const specTypeMeta = getSpecializationData?.find(
          (i: any) => i.value === specTypeId,
        );

        const existing = hospitalSpecialityData?.find(
          (entry: any) => entry.specializationId === specId,
        );

        return {
          hospitalSpecializationId: existing?.hospitalSpecializationId || 0,
          specializationId: specId,
          specializationName: specMeta?.label || "",
          levelOfCareId: levelId,
          levelOfCareName: levelMeta?.label || "",
          specializationTypeId: specTypeId,
          specializationTypeName: specTypeMeta?.label || "",
        };
      });

    const payload = {
      crud: 3,
      hospitalRegNo: hospitalRegNo,
      userId: hospitalRegNo,
      entryDateTime: new Date().toISOString(),
      clientIp: user?.clientIP || "",
      bl: selectedSpecializations,
    };
    saveHospiatlSpec(payload);
  };

  return (
    <ScreenWrapper title="Hospital Specializations">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={[24, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Primary Specialization Type"
              name="specializations"
              rules={[{ required: true, message: "Required" }]}
            >
              <Select
                options={getSpecializationData}
                size="large"
                placeholder="Select Type"
                loading={isSpecTypeLoading}
                prefix={
                  <FaHandHoldingMedical className="text-green-600 mr-2" />
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Level Of Care"
              name="LevelOfCare"
              rules={[{ required: true, message: "Required" }]}
            >
              <Select
                options={getLevelData}
                size="large"
                placeholder="Select Level"
                prefix={<FaHandHoldingHeart className="text-red-500 mr-2" />}
              />
            </Form.Item>
          </Col>
        </Row>

        <SubHeading title="Specialization Facilities List" />

        <div className="mt-4">
          <MasterTable
            columns={columns}
            bordered
            data={SpecializationFacilityData}
            isLoading={isFacilityListLoading || isDetailLoading}
            rowKey="value"
            pagination={{ pageSize: 10 }}
            showExport={false}
            showSearch={true}
          />
        </div>

        <div className="flex justify-center mt-12 pb-6">
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={saveHospitalSpecPending}
            className="px-16 h-12 rounded-full font-bold shadow-lg"
          >
            Update Specializations
          </Button>
        </div>
      </Form>
    </ScreenWrapper>
  );
};

export default HospitalSpecialization;
