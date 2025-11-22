/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** upload.resolvers
 */

import { GraphQLError } from "graphql";
// import { v4 as uuidv4 } from "uuid";
import { minioClient, bucketName } from "../../s3/minio.mjs";

const uploadResolvers = {
  Mutation: {
    uploadFile: async (_, { file }, { user }) => {
      if (!user) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      try {
        const { createReadStream, filename, mimetype } = await file;

        if (!filename) throw new Error("No filename provided");

        const stream = createReadStream();
        
        const objectName = `${user.user_id}/${Date.now()}-${filename}`;

        await minioClient.putObject(bucketName, objectName, stream, null, {
          'Content-Type': mimetype
        });

        const publicUrl = process.env.NEXT_PUBLIC_MINIO_URL || "http://localhost:9000";
        const url = `${publicUrl}/${bucketName}/${objectName}`;

        // const url = await minioClient.presignedGetObject(bucketName, objectName, 24*60*60);

        return {
          success: true,
          url: url,
          message: "File uploaded successfully",
        };

      } catch (error) {
        console.error("MinIO Upload Error:", error);
        throw new GraphQLError("Failed to upload file", {
          extensions: { 
            code: "INTERNAL_SERVER_ERROR",
            originalError: error
          },
        });
      }
    },
  },
};

export default uploadResolvers;