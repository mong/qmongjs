import { ResponseResolver, RestRequest, RestContext } from "msw";
import {
  buildDescriptions,
  buildIndicators,
  buildRegisterNames,
  buildMedicalFields,
  buildUnitNames,
} from "../data_builders";

export const mockDescription: ResponseResolver<RestRequest, RestContext> = (
  req,
  res,
  ctx
) => {
  const type: string = req.url.searchParams.get("type") ?? "";
  const { register } = req.params as any;

  if (type === "ind" || type === "dg") {
    return res(
      ctx.status(200),
      ctx.json(buildDescriptions({ register, type }))
    );
  }
  if (type === "") {
    return res(ctx.status(200), ctx.json(buildDescriptions({ register })));
  }

  return res(
    ctx.status(400),
    ctx.json({
      errorMassage: `unknown type parameter ${type}`,
    })
  );
};

export const mockIndicators: ResponseResolver<RestRequest, RestContext> = (
  req,
  res,
  ctx
) => {
  const { register } = req.params as any;
  const type: "ind" | "dg" =
    req.url.searchParams.get("type") === "dg" ? "dg" : "ind";
  const year: number = Number(req.url.searchParams.get("year"));
  const unitNames: string[] = req.url.searchParams.getAll("unit_name[]");
  const unitLevel: string | undefined =
    req.url.searchParams.get("unit_level") ?? undefined;

  return res(
    ctx.status(200),
    ctx.json(buildIndicators({ register, year, type, unitNames, unitLevel }))
  );
};

export const mockRegisterNames: ResponseResolver<RestRequest, RestContext> = (
  _,
  res,
  ctx
) => {
  return res(ctx.status(200), ctx.json(buildRegisterNames()));
};

export const mockMedicalFields: ResponseResolver<RestRequest, RestContext> = (
  _,
  res,
  ctx
) => {
  return res(ctx.status(200), ctx.json(buildMedicalFields()));
};

export const mockUnitNames: ResponseResolver<RestRequest, RestContext> = (
  _,
  res,
  ctx
) => {
  return res(ctx.status(200), ctx.json(buildUnitNames()));
};

export const mockRest: ResponseResolver<RestRequest, RestContext> = (
  req,
  res,
  ctx
) => {
  return res(
    ctx.status(500),
    ctx.json({
      errorMassage: `Add a request handler for ${req.url}`,
    })
  );
};
