import {MultipartFileInfo} from './types.js';
import {Readable} from 'stream';
import {Hash} from 'crypto';

/**
 * A remote storage adaptor
 *
 * @template F The file descriptor type for uploaded file
 * @template P The partition descriptor type for partitioned upload
 */
export abstract class RemoteStorageAdaptor<F extends {}, P extends {}> {
  /**
   * The maximum file size can be uploaded using `RemoteStorageAdaptor.upload`,
   * file larger than this size must be uploaded using partitioned upload
   */
  abstract readonly simpleUploadSizeLimit: number;

  /**
   * The maximum partition size can be uploaded using `RemoteStorageAdaptor.uploadPartition`
   */
  abstract readonly partitionedUploadSizeLimit: number;

  /**
   * THe maximum size of chunk for the readable stream that upload content to remote storage
   */
  abstract readonly partitionedUploadChunkLimit: number;

  /**
   * The maximum number of files can be uploaded for each instance of `RemoteStorageAdaptor`
   */
  abstract readonly fileCountLimit: number;

  /**
   * The maximum file size supported by the remote storage
   */
  abstract readonly fileSizeLimit: number;

  /**
   * Upload a file to the remote storage
   *
   * The implementation of this method should calculate the checksum of the buffer if checksum is enabled.
   *
   * @param name
   * @param buffer
   * @param info
   */
  abstract upload(name: string, buffer: Buffer, info: MultipartFileInfo): Promise<F>;

  /**
   * Create a hash object for calculating checksum if checksum is enabled
   *
   * @returns a Hash object if checksum is enabled, otherwise null
   */
  abstract createChecksumCalculator(): Hash | null;

  /**
   * Initiate a partitioned upload for a file
   * @param name
   * @param info
   */
  abstract beginPartitionedUpload(name: string, info: MultipartFileInfo): Promise<P>;

  /**
   * Upload a partition of a file to the remote storage
   * @param pud The partitioned upload descriptor returned by `beginPartitionedUpload`
   * @param readable The readable stream of this partition
   * @param size The size of this partition
   * @param checksumCalculator The checksum returned by `createChecksumCalculator`, filled with the data of this partition
   */
  abstract uploadPartition(pud: P, readable: Readable, size: number, checksumCalculator: Hash | null): Promise<void>;

  /**
   * Finish a partitioned upload
   * @param pud The partitioned upload descriptor returned by `beginPartitionedUpload`
   */
  abstract finishPartitionedUpload(pud: P): Promise<F>;

  /**
   * Abort a partitioned upload
   * @param pud The partitioned upload descriptor returned by `beginPartitionedUpload`
   */
  abstract abortPartitionedUpload(pud: P): Promise<void>;

  abstract createReadStream(file: F): NodeJS.ReadableStream;

  abstract cleanup(): Promise<void>;
}
