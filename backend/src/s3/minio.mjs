/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** client
 */

import { Client } from "minio";

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: parseInt(process.env.MINIO_PORT),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

const bucketName = process.env.MINIO_BUCKET;

async function ensureBucketExists() {
  try {
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
      await minioClient.makeBucket(bucketName, "us-east-1");
      console.log(`Bucket "${bucketName}" créé avec succès`);
    } else {
      console.log(`Bucket "${bucketName}" existe déjà`);
    }
  } catch (error) {
    console.error("Erreur lors de la création du bucket:", error);
    throw error;
  }
}

ensureBucketExists();

export { minioClient, bucketName };
