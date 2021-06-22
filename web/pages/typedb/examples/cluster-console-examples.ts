export const highAvailabilityExample =
`> database mytypedb status replica
1) 10.1.17.23:
  - availability     : available
  - role             : primary
  - uptime           : 12h 3m
  - syncing          : 0 / 34,321
  - term             : 51
2) 10.1.17.15:
  - availability     : available
  - role             : secondary
  - uptime           : 3d 8h 14m 2s
  - syncing          : 21 / 34,319
  - term             : 51
3) 10.1.17.37:
  - availability     : unavailable`;

export const elasticThroughputExample =
`> database mytypedb status request
1) 10.1.17.23 (primary):
  - last 1 second    : 15,541 writes, 21,756 reads
  - last 1 hour        : 50,206,440 writes, 78,211,600 reads
  - last 24 hours    : 1,204,954,560 writes, 1,879,312,402 reads
2) 10.1.17.15 (secondary):
  - last 1 second    : 0 writes, 21,346 reads
  - last 1 hour         : 0 writes, 78,219,745 reads
  - last 24 hours    : 71,318,976 writes, 1,880,718,223 reads
3) 10.1.17.37 (secondary):
  - last 1 second    : 0 writes, 22,001 reads
  - last 1 hour         : 0 writes, 78,220,472 reads
  - last 24 hours    : 0 writes, 1,881,631,782 reads`;

export const secureAuthenticationExample =
`root@10.1.17.15# ./typedb console --cluster=10.1.17.15:1729 --username admin
Password: ************
> user create alice
Password: ************
> user alice password
Password: ************************
> user delete alice`;

export const inFlightEncryptionExample =
`root$ tshark -i eth0 -T fields -e "data.data" -z "follow,tcp,ascii,0"
43 packets captured
 
==========================================================
Follow: tcp,ascii
Filter: tcp.stream eq 0
Node 0: 10.1.17.2:59947
Node 1: 10.1.17.15:1729
126
46
EnCt245fd8f82a976d84690296a8ddd386964f068dcfa45fd8f82a976d84690296azof2yx2Ajp
GlNakGmQzhMRYKeHjpS4Wn48jcDYtgPucSkldHlraTZbY0fN8hsTwRtxVc3gukaypsmFaXU6eyTO2
R525LaphqzaUIyJnhB9VSAqGC8evoCnZHuO9QqlwUUFysLbblPS5dJvqMTvHOEGM3LXUlEmxZQbyJ
j5tPUFIoCyQPDWJ1UUqbJjzr3ZFaNBBy3B1b59xJNjzJpJi26VFN6wY6oS6FFfO5VNV3WcE1T35Oe
Vhruh5oAZzOOEnKeHjpS`;

export const clusterManagementExample =
`root$ ./typedb cluster --username=admin \
>  --address=10.1.17.15:1729:1730:1731 \
>  --cluster=10.1.17.37:1729:1730:1731
root$
root$ ./typedb console --cluster
>
> cluster 10.1.17.23 terminate
Asking 10.1.17.23 to leave the cluster and shutdown...
Server 10.1.17.23 has left the cluster
>
> cluster 10.1.17.37 left
Server 10.1.17.37 has left the cluster`;

export const backupAndRecoveryExample =
`> database mytypedb backup status
status       : scheduled
frequency : Every 7 days
next          : Mon 07 Jun 2021 12:26:33 UTC
>
> database mytypedb backup now
> 
> database mytypedb backup schedule start=2021-06-21T12:00:00 every=7d
>
> database mytypedb backup 4 delete
>
> database mytypedb backup 3 restore
The following backup will be restored: (id: 3) Mon 21 Jun 2021 12:26:02 UTC
Press [Y] to continue or [n] to cancel: Y
Restoration is in progress ...`;
