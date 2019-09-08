import { OfKind } from "./utils/types";

export type PackageKind = "Monorepo" | "MonorepoRoot" | "Standalone";

export interface PackageOfKind<T extends PackageKind> extends OfKind<T> {
  name: string;
}

interface CommonMonorepoPackageConfigurationFields {
  namespace: string;
}

export interface StandalonePackageConfiguration
  extends PackageOfKind<"Standalone"> {}

export interface MonorepoPackageConfiguration
  extends PackageOfKind<"Monorepo">,
    CommonMonorepoPackageConfigurationFields {
  selfRoot: string;
}

export interface MonorepoRootPackageConfiguration
  extends PackageOfKind<"MonorepoRoot">,
    CommonMonorepoPackageConfigurationFields {
  packagesRoots: string[];
}

export type PackageConfiguration =
  | StandalonePackageConfiguration
  | MonorepoPackageConfiguration
  | MonorepoRootPackageConfiguration;
