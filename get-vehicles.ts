import fetch from "node-fetch";

type GetVehiclesResponse = {
  data: {
    pagitation: {
      current_page: number;
      max_per_page: number;
      total_pages: number;
    };
    vehicles: {
      battery_status?: {
        charging?: boolean;
        percentage?: number;
      };
      dock?: {
        dock_serial?: string;
        dock_type?: "DOCK" | "DOCK_LITE";
      };
      flight_status?: "FLYING" | "POST_FLIGHT" | "PREP" | "REST" | "UNKNOWN";
      is_online?: boolean;
      is_online_via_mobile?: boolean;
      mission_status?: {
        current_mission?: {
          mission_name?: string;
          mission_template_uuid: string;
          seconds_until_takeoff?: string;
          state?: "IN_PROGRESS" | "PAUSED" | "POST_MISSION_ACTION";
        };
        next_scheduled_mission?: {
          mission_name?: string;
          mission_template_uuid: string;
          seconds_until_takeoff?: string;
          state?: "IN_PROGRESS" | "PAUSED" | "POST_MISSION_ACTION";
        };
      };
      remote_stream_state?:
        | "disabled"
        | "pending"
        | "active"
        | "blocked"
        | "device_offline"
        | "device_unsupported";
      upload_status?: {
        files_to_upload?: number;
        uploading?: true;
      };
      user_emails: string[];
      vehicle_class: "Skydio R1" | "Skydio 2" | "Skydio X2";
      vehicle_serial: string;
      vehicle_type?: "R1" | "R3" | "E1";
    }[];
  };
  meta: {
    time: number;
  };
  skydio_error_code: number;
  status_code: number;
};

async function main() {
  const url = "https://api.skydio.com/api/v0/vehicles";
  const getFlightsResponse = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: process.env.SKYDIO_API_TOKEN!,
    },
  });

  if (getFlightsResponse.status !== 200) {
    throw new Error(await getFlightsResponse.text());
  }

  const getFlightsData =
    (await getFlightsResponse.json()) as GetVehiclesResponse;

  console.log(JSON.stringify(getFlightsData, null, 2));
}

main().catch((err) => console.error(err));
