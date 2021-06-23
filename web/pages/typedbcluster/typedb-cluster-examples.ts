export const highAvailabilityExample = `> database my-typedb status replica
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

export const elasticThroughputExample = `>
> database my-typedb status request
1) 10.1.17.23 (primary):
  - last 1 second    : 15,541 writes, 21,756 reads
  - last 1 hour      : 50,206,440 writes, 78,211,600 reads
  - last 24 hours    : 1,204,954,560 writes, 1,879,312,402 reads
2) 10.1.17.15 (secondary):
  - last 1 second    : 0 writes, 21,346 reads
  - last 1 hour      : 0 writes, 78,219,745 reads
  - last 24 hours    : 71,318,976 writes, 1,880,718,223 reads
3) 10.1.17.37 (secondary):
  - last 1 second    : 0 writes, 22,001 reads
  - last 1 hour      : 0 writes, 78,220,472 reads
  - last 24 hours    : 0 writes, 1,881,631,782 reads`;

export const secureAuthenticationExample = `root$
root$ ./typedb console --cluster=10.1.17.15:1729 --username admin
Password: ************
> user create alice
Password: ************
> user alice password
Password: ************************
> user delete alice`;

export const inFlightEncryptionExample = `root$
root$ tshark -i eth0 -T fields -e "data.data" -z "follow,tcp,ascii,0"
43 packets captured
==========================================================
Follow: tcp,ascii
Filter: tcp.stream eq 0
Node 0: 10.1.17.2:59947
Node 1: 10.1.17.15:1729
126
46
{.D....U..0.:3..J..RX...MW.o...w5.V..Z..V../........Vf..%....|.......T'.V.Q..7.s
v...U*L.].C3.0......RNK,4E'......S...w..r..3.....Y.v.T...j..j.....2*.....p.9....
......nR...X.."/..j.I&.,...b.x..j.h....=p.x..h.....(..u.....Q.o3.M1A.x..C.....|o
...(.A3X..p..U.6...Kv...&:.e.....N.]3..d8.Zo=.....J;.k.f.b..n].tK..{.D....U..0.:
3..J..RX...MW.o...w5.V..Z..V../........Vf..%....|.......T'.V.Q..7.sv...U*L.].C3.
0......RNK,4E'......S...w..r..3.....Y.v.T...j..j.....2*.....p.9..........nR...X.`;

export const clusterManagementExample = `root$
root$ ./typedb cluster --username=admin --address=10.1.17.15:1729:1730:1731 --cluster=10.1.17.37:1729:1730:1731
root$
root$ ./typedb console --cluster
>
> cluster 10.1.17.23 terminate
Asking 10.1.17.23 to leave the cluster and shutdown...
Server 10.1.17.23 has left the cluster
>
> cluster 10.1.17.37 left
Server 10.1.17.37 has left the cluster`;

export const liveBackupExample = `> database my-typedb backup activate /disk2/backup
> database my-typedb backup status
- status        : active
- snapshot      : 1,263,523     
- compaction
  * frequency   : every 7 days
  * last        : Mon 21 Jun 2021 12:00:00 UTC
  * next        : Mon 28 Jun 2021 12:00:00 UTC
>
> database my-typedb backup compaction start=2021-06-25T12:00:00 every=2d
>
> database my-typedb restore 1164825
The following backup copy will be restored: 
Snapshot: 1,164,825 
From: Mon 22 Jun 2021 15:26:02 UTC
Press [y] to continue or [n] to cancel: y
Restoration is in progress. Database will be running in 'read-only' mode during the process.`;
