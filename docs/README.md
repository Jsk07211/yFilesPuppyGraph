# Beyond Graphs: The Hows and Whys of Data Storytelling
Spreadsheets and SQL tables are great for storing information, but they weren't designed for telling stories. They show you what’s there, but not always how it connects. And that’s where the real insights often live. Here's where graph databases come into play.

Graphs are incredibly powerful for analysis. Unlike traditional databases, which force you to think in rows, joins, and foreign keys, graph queries follow the actual shape and meaning of your data. You’re not asking “What’s in table A that matches table B?”—you’re saying “Show me all the customers who influenced someone else who bought this product last week.” It’s closer to how people naturally think, providing an intuitive way to traverse through your data.

But understanding the data is only half the battle. The other half? Telling the story. That’s where graph visualization comes in. In this guide, we look at how data storytelling with graphs can improve clarity and shape understanding, allowing you to get more mileage out of the data you already have.

# Choosing the Right Tool: Why Graphs?
Before diving into layouts and visualizations, it’s worth asking: why graphs at all? What makes them so special when it comes to making sense of complex data?

A graph consists of three basic blocks:
* Vertices: Entities or objects (e.g., people, places).
* Edges: Relationships between vertices (e.g., "logged in", "reviewed").
* Properties: Key-value pair of attributes for a vertex or an edge (e.g., a user's name or the date of purchase)

Who influenced whom? Which products are frequently bought together? What steps lead from issue to resolution? These are inherently relational questions, which are perfect for a graph solution. In a graph database, those relationships aren't just inferred through joins—they're baked into the structure itself. Each edge is a direct, stored connection, making it possible to traverse complex networks of data in a way that’s fast, meaningful, and true to how the relationships actually exist.

# Understanding the Data: Which Graphs?
## Hierarchial Layout

## Organic Layout

## Orthogonal Layout

## Circular Layout

## Tree Layout

# Visualizing the Theory: How to Create A Graph?
For this section of the tutorial, we will be building a **cloud security graph** — and for good reason. Cloud security is one of the most common and impactful use cases for graph analytics. With complex relationships between users, roles, assets, permissions, and threats, it's a perfect real-world example of where graph structures truly shine. You can find all required resources in the [GitHub repository](https://github.com/puppygraph/puppygraph-getting-started/tree/main/use-case-demos/cloud-security-graph-demo), and a more in-depth exploration of this dataset in our [blog](https://www.puppygraph.com/blog/wiz-security-graph).

## Step 1: Deploying PuppyGraph

### Setting up the Docker
We'll need several things for this tutorial:
- Docker and Docker Compose
- Python 3
- [Cloud Security Dataset](https://github.com/puppygraph/puppygraph-getting-started/tree/main/use-case-demos/cloud-security-graph-demo)

PuppyGraph can be deployed via [Docker or an AWS AMI](https://docs.puppygraph.com/getting-started/) through AWS Marketplace. We'll be launching a PuppyGraph instance on Docker for this demo.

After cloning the repository onto your local machine, you can navigate there and run `docker compose up -d` to launch the container and other services. You should see the following appear on your terminal:
```
[+] Running 6/6
✔ Network puppy-iceberg         Created
✔ Container minio               Started
✔ Container mc                  Started
✔ Container iceberg-rest        Started
✔ Container spark-iceberg       Started
✔ Container puppygraph          Started
```

You can open your browser and go to your instance's URL to access PuppyGraph's login screen. By default, this is `localhost:8081`. Log in using the default credentials:
```
username: puppygraph
password: puppygraph123
```

Once we get the data loaded, we'll return to this screen to set up the schema (the blueprint for how the data is organized).

### Data Preparation
We will first convert our csv data to into Paraquet format via the python script. The Paraquet format is designed for efficient data storage and retrieval, making it perfect for graph querying.

To keep the demonstration self-contained, we recommend creating a virtual environment to activate and install the necessary packages.
```
python3 -m venv demo_venv
source demo_venv/bin/activate
pip install pandas pyarrow
```

We can then run the following command in the repository:
```
python3 CsvToParquet.py ./csv_data ./parquet_data
```

### Data Import
Now that we have our data in the desired file format, we can begin to populate our Iceberg tables. First, start the Spark-SQL shell:
```
docker exec -it spark-iceberg spark-sql
```

You should see the following shell prompt:
```
spark-sql ()>
```

<details>
<summary>SQL Commands to Create Tables</summary>

```CREATE DATABASE security_graph;

CREATE EXTERNAL TABLE security_graph.Users (
  user_id               BIGINT,
  username              STRING,
  email                 STRING,
  phone                 STRING,
  created_at            TIMESTAMP,
  last_login            TIMESTAMP,
  account_status        STRING,
  authentication_method STRING,
  failed_login_attempts INT
) USING iceberg;

CREATE EXTERNAL TABLE security_graph.InternetGateways (
  internet_gateway_id   BIGINT,
  name                  STRING,
  region                STRING,
  status                STRING
) USING iceberg;

CREATE EXTERNAL TABLE security_graph.UserInternetGatewayAccess (
  user_id               BIGINT,
  internet_gateway_id   BIGINT,
  access_level          STRING,
  granted_at            TIMESTAMP,
  expires_at            TIMESTAMP,
  last_accessed_at      TIMESTAMP
) USING iceberg;

CREATE EXTERNAL TABLE security_graph.UserInternetGatewayAccessLog (
  log_id                BIGINT,
  user_id               BIGINT,
  internet_gateway_id   BIGINT,
  access_time           TIMESTAMP
) USING iceberg;

CREATE EXTERNAL TABLE security_graph.VPCs (
  vpc_id BIGINT,
  name STRING
) USING iceberg;

CREATE EXTERNAL TABLE security_graph.InternetGatewayVPC (
  internet_gateway_id BIGINT,
  vpc_id BIGINT
) USING iceberg;

CREATE EXTERNAL TABLE security_graph.Subnets (
  subnet_id BIGINT,
  vpc_id BIGINT,
  name STRING
) USING iceberg;

CREATE EXTERNAL TABLE security_graph.SecurityGroups (
  security_group_id BIGINT,
  name STRING
) USING iceberg;

CREATE EXTERNAL TABLE security_graph.SubnetSecurityGroup (
  subnet_id BIGINT,
  security_group_id BIGINT
) USING iceberg;

CREATE EXTERNAL TABLE security_graph.NetworkInterfaces (
  network_interface_id BIGINT,
  subnet_id BIGINT,
  security_group_id BIGINT,
  name STRING
) USING iceberg;

CREATE EXTERNAL TABLE security_graph.VMInstances (
  vm_instance_id BIGINT,
  network_interface_id BIGINT,
  role_id BIGINT,
  name STRING
) USING iceberg;

CREATE EXTERNAL TABLE security_graph.Roles (
  role_id BIGINT,
  name STRING
) USING iceberg;

CREATE EXTERNAL TABLE security_graph.Resources (
  resource_id BIGINT,
  name STRING
) USING iceberg;

CREATE EXTERNAL TABLE security_graph.RoleResourceAccess (
  role_id BIGINT,
  resource_id BIGINT
) USING iceberg;

CREATE EXTERNAL TABLE security_graph.PublicIPs (
  public_ip_id BIGINT,
  ip_address STRING,
  network_interface_id BIGINT
) USING iceberg;

CREATE EXTERNAL TABLE security_graph.PrivateIPs (
  private_ip_id BIGINT,
  ip_address STRING,
  network_interface_id BIGINT
) USING iceberg;

CREATE EXTERNAL TABLE security_graph.IngressRules (
  ingress_rule_id BIGINT,
  security_group_id BIGINT,
  protocol STRING,
  port_range STRING,
  source STRING
) USING iceberg;

CREATE EXTERNAL TABLE security_graph.IngressRuleInternetGateway (
  ingress_rule_id BIGINT,
  internet_gateway_id BIGINT
) USING iceberg;

INSERT INTO security_graph.Users
SELECT
    user_id,
    username,
    email,
    phone,
    CAST(created_at AS TIMESTAMP),
    CAST(last_login AS TIMESTAMP),
    account_status,
    authentication_method,
    failed_login_attempts
FROM parquet.`/parquet_data/Users.parquet`;

INSERT INTO security_graph.InternetGateways
SELECT * FROM parquet.`/parquet_data/InternetGateways.parquet`;

INSERT INTO security_graph.UserInternetGatewayAccess
SELECT
    user_id,
    internet_gateway_id,
    access_level,
    CAST(granted_at AS TIMESTAMP),
    CAST(expires_at AS TIMESTAMP),
    CAST(last_accessed_at AS TIMESTAMP)
FROM parquet.`/parquet_data/UserInternetGatewayAccess.parquet`;

INSERT INTO security_graph.UserInternetGatewayAccessLog
SELECT
    log_id,
    user_id,
    internet_gateway_id,
    CAST(access_time AS TIMESTAMP)
FROM parquet.`/parquet_data/UserInternetGatewayAccessLog.parquet`;

INSERT INTO security_graph.VPCs
SELECT * FROM parquet.`/parquet_data/VPCs.parquet`;

INSERT INTO security_graph.InternetGatewayVPC
SELECT * FROM parquet.`/parquet_data/InternetGatewayVPC.parquet`;

INSERT INTO security_graph.Subnets
SELECT * FROM parquet.`/parquet_data/Subnets.parquet`;

INSERT INTO security_graph.SecurityGroups
SELECT * FROM parquet.`/parquet_data/SecurityGroups.parquet`;

INSERT INTO security_graph.SubnetSecurityGroup
SELECT * FROM parquet.`/parquet_data/SubnetSecurityGroup.parquet`;

INSERT INTO security_graph.NetworkInterfaces
SELECT * FROM parquet.`/parquet_data/NetworkInterfaces.parquet`;

INSERT INTO security_graph.VMInstances
SELECT * FROM parquet.`/parquet_data/VMInstances.parquet`;

INSERT INTO security_graph.Roles
SELECT * FROM parquet.`/parquet_data/Roles.parquet`;

INSERT INTO security_graph.Resources  
SELECT * FROM parquet.`/parquet_data/Resources.parquet`;

INSERT INTO security_graph.RoleResourceAccess  
SELECT * FROM parquet.`/parquet_data/RoleResourceAccess.parquet`;

INSERT INTO security_graph.PublicIPs
SELECT * FROM parquet.`/parquet_data/PublicIPs.parquet`;

INSERT INTO security_graph.PrivateIPs 
SELECT * FROM parquet.`/parquet_data/PrivateIPs.parquet`;

INSERT INTO security_graph.IngressRules 
SELECT * FROM parquet.`/parquet_data/IngressRules.parquet`;

INSERT INTO security_graph.IngressRuleInternetGateway 
SELECT * FROM parquet.`/parquet_data/IngressRuleInternetGateway.parquet`;
```
</details>

### Loading the Schema
Going back to the PuppyGraph Web UI at [http://localhost:8081](http://localhost:8081) from when we set up the Docker, select `schema.json` from the repository. 

Alternatively, you can run the following command in your terminal:
```
curl -XPOST -H "content-type: application/json" --data-binary @./schema.json --user "puppygraph:puppygraph123" localhost:8081/schema
```

We can now query our relational data as a graph!

## Step 2: Creating the Website Template
For websites HTML 2.5 and higher, yWorks has an [app generator](https://www.yworks.com/app-generator/) to quickly create a web app for visualization purposes. You also want the yFiles-for-HTML server up and running so that the app generator can access the data we uploaded to our PuppyGraph instance.

Our dataset contains quite a few kinds of vertices and edges, so we'll have to add those in. When making the visualizations, it's also possible to filter out certain information from view without needing to make an additional query. For this demonstration, we'll only be looking at "User" and "InternetGateway" vertices, as well as the "ACCESS" edges.

Using their app generator, we should get something like this:
![](/docs/all.png)

We can also edit the code in `loadGraph.js` instead of using the app generator. 

## Step 3: Querying the Graph
The full graph looks cool — no doubt. But when you're staring at hundreds of nodes and edges, it gets hard to tell what’s actually going on. It’s a lot to take in, and without some direction, it’s easy to get lost in the noise.

Currently, we're querying for everything with this command:
```
g.V().valueMap(true)
```

Let's narrow down the scope of our search. What if I only wanted to know which internet gateways were in use by **active** users? We'll need to know which users are active and which gateways are connected to these active users. For readability, we'll split the query into three parts:

Query 1: Getting the Access Edges
```
const data = await runQuery({
  query: 'g.E()',
  password: '',
  url: 'ws://localhost:8182/gremlin',
  username: '',
  mimeType: 'application/vnd.gremlin-v3.0+json',
})
```

Query 2: Getting the Active Users
```
  const data2 = await runQuery({
    query: 'g.V().hasLabel("InternetGateway")',
    url: 'ws://localhost:8182/gremlin',
    username: 'puppygraph',
    password: 'puppygraph123',
    mimeType: 'application/vnd.gremlin-v3.0+json'
  })
```

Query 3: Getting the Relevant Internet Gateways
```
const data3 = await runQuery({
  query: 'g.V().hasLabel("User").has("account_status", "active")',
  url: 'ws://localhost:8182/gremlin',
  username: 'puppygraph',
  password: 'puppygraph123',
  mimeType: 'application/vnd.gremlin-v3.0+json'
})
```

We can just update how we're loading our vertices:
```
const out = await project(data, { binding: (item) => item._items })
const out2 = await project(data2, { binding: (item) => item._items })
const out3 = await project(data3, { binding: (item) => item._items })

const out4 = await filter(out, {
  expression: new Function(
    'with(arguments[0]) { return (label === "ACCESS") }'
  ),
})
const out5 = await filter(out2, {
  expression: new Function(
    'with(arguments[0]) { return (label === "InternetGateway") }'
  ),
})
const out6 = await filter(out3, {
  expression: new Function(
    "with(arguments[0]) { return (label === 'User') }"
  ),
})
```

Alternatively, we could also run the following query and reformat the returned data into the expected format:
```
g.V().hasLabel("User").has("account_status", "active").as("user").bothE().as("access").otherV().as("gateway").select("user", "access", "gateway")
```

If all works well, we should get the following webview:
![](/docs/hierarchial.png)

When you're looking at which active users are accessing internet gateways, a hierarchical layout can really help untangle the picture. It gives you a clear top-down view of who’s connected to what, and makes it easier to spot overloaded gateways or unusual traffic patterns. But it’s not perfect. That same structure can make it harder to see lateral relationships or cross-connections that don’t fit neatly into a tree.

We can try out an Organic Layout, which makes it easier to see the exact users that are connected to each internet gateway, but it also introduces a fair bit of clutter:
![](/docs/organic.png)

That’s the tradeoff: different layouts surface different insights. And ultimately, it’s the combination of a well-formed query and the right visual structure that makes a graph not just informative, but meaningful. When those two pieces click, you’re not just analyzing data—you’re telling a story with it.

# Conclusion