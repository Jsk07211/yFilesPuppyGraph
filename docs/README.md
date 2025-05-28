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
By now, we’ve seen why graphs are such a powerful tool for working with connected data. But just because the data is structured as a graph doesn’t mean it’ll look meaningful at first glance. That’s where layout comes in.

The way a graph is drawn can completely change how we understand it. A good layout brings structure to complexity, highlights important relationships, and makes it easier to spot patterns. A bad one? It turns even the best data into a tangled mess.

So now that we’ve chosen the right tool—a graph—the next question is: which layout best reveals the story our data is trying to tell?

Let's take a look at five common layout types—hierarchical, organic, orthogonal, circular, and tree—and explore what kinds of data each one works best with, along with the pitfalls to watch out for when using them. Because just like with querying, the right layout is less about aesthetics and more about clarity.

## Hierarchial Layout
The hierarchical layout is all about structure. It arranges nodes in layers—usually from top to bottom or left to right—making it ideal for visualizing flows, dependencies, and authority. Think of things like org charts, decision trees, or data pipelines. It gives you a clear sense of direction: who reports to whom, what leads to what, and where things begin and end.

![](/images/hierarchial_eg.png)

Best when you want to:
* Show dependencies or flow
* Visualize multi-stage processes or pipelines
* Emphasize top-down relationships

Pitfalls:
* Can obscure lateral relationships or connections that don’t fit into a linear flow
* Might create visual clutter if too many nodes or levels are stacked
* Less effective for showing interconnectedness between nodes at the same level

## Organic Layout
The organic layout is great when you're working with data that doesn’t follow a strict order but still has some underlying structure. It spaces things out in a way that feels intuitive—nodes that are closely related end up near each other, while less-connected ones drift apart. It’s like watching a network settle into shape on its own.

This kind of layout works especially well when you're exploring relationships and trying to spot patterns or groupings. Whether you're mapping out interactions in a social network or seeing which products get tagged together, it gives you a feel for how things naturally cluster.

![](/images/organic_eg.png)

Best suited for:
* Discovering clusters or communities
* Exploring organic, real-world connections
* Letting the data’s structure emerge visually

Pitfalls:
* Can become visually cluttered with too many nodes or connections
* May lack clear directionality, making it hard to follow the flow of relationships
* Less effective when trying to display data that requires clear structure

## Orthogonal Layout
The orthogonal layout is built for clarity and structure. It arranges nodes using horizontal and vertical lines, with right-angled bends in the edges. This makes it especially useful when you're working with systems that benefit from tidy, grid-like alignment—think flowcharts, database schemas, or technical diagrams.

The right angles and clean spacing make it easier to follow connections without visual clutter, especially in diagrams where overlapping lines would cause confusion.

![](/images/orthogonal_eg.png)

Best suited for:
* Visualizing system architectures or technical diagrams
* Maintaining clean separation between nodes and edges
* Reducing visual overlap in dense, structured graphs

Pitfalls: 
* May feel too rigid for data that doesn’t follow a neat, grid-like structure
* Can create unnatural relationships by forcing nodes into specific alignments
* Not ideal for visualizing organic or highly interconnected data

## Circular Layout
The circular layout arranges nodes in a circle, with edges connecting them in a radial pattern. This layout is especially useful when you want to emphasize the equal relationship between nodes, rather than having one clear "leader" or "direction." It's perfect for visualizing networks where there are no clear top-down structures—like peer-to-peer systems or cyclical data.

One of the biggest advantages of the circular layout is that it forces the network into a symmetrical structure, helping to highlight cyclic relationships or interactions that occur between all nodes. If you're analyzing social networks or feedback loops, this layout can give you a good sense of how things relate on the same level.

![](/images/circular_bcc_eg.png)

Best suited for:
* Visualizing peer-to-peer or cyclical relationships
* Highlighting equal relationships among all nodes
* Representing networks with no clear direction or flow

Pitfalls:
* Can make directionality hard to discern, especially in complex networks
* Might become difficult to read when dealing with large datasets or too many connections
* May not represent hierarchical or flow-based relationships effectively

## Tree Layout
The tree layout is all about clear, hierarchical relationships. It’s similar to a family tree, where nodes are arranged in a branching structure, showing parent-child relationships. This layout is perfect for data that follows a strict hierarchy, where one node has a clear single parent and potentially many child nodes.

The tree layout is ideal when you need to emphasize ancestry, like when you’re exploring organizational charts or taxonomy classifications. It visually clarifies the connections between different levels, making it easy to see how everything is related within the hierarchy.

![](/images/tree_eg.png)

Best suited for:
* Visualizing clear parent-child relationships
* Mapping out organizational structures or taxonomies
* Representing data with a strict hierarchical structure

Pitfalls:
* Struggles with nodes that have multiple parents, leading to confusing layouts
* Not effective for representing complex or circular relationships
* Can get cluttered or overwhelming with large hierarchies, especially if nodes have many children

## Deciding on a Layout
The layout you pick should match the structure of your data and the story you're trying to tell.

For example, if you need to show a clear, ordered flow, something like a hierarchical or tree layout works well. If your data is more about connections and relationships, an organic or circular layout might give you a better view of the patterns. And if precision and structure are key, an orthogonal layout can keep everything neat and easy to follow.

Of course, there are many other graph layouts out there, each suited to different kinds of data. The key is finding the one that best helps you reveal the insights you’re looking for and makes your data easier to understand. The right layout, paired with the right queries, is what transforms your data from numbers and lines into a meaningful story.

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

We'll be using yWork's app generator, so make sure your yFiles-for-HTML server is running in order to access your data. After a little bit of tinkering, we should get something like this:
![](/images/all.png)

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
![](/images/hierarchial.png)

When you're looking at which active users are accessing internet gateways, a hierarchical layout can really help untangle the picture. It gives you a clear top-down view of who’s connected to what, and makes it easier to spot overloaded gateways or unusual traffic patterns. But it’s not perfect. That same structure can make it harder to see lateral relationships or cross-connections that don’t fit neatly into a tree.

![](/images/organic.png)
With the Organic Layout, it is much easier to see the exact users that are connected to each internet gateway, but it also introduces a fair bit of clutter.

That’s the tradeoff: different layouts surface different insights. And ultimately, it’s the combination of a well-formed query and the right visual structure that makes a graph not just informative, but meaningful. When those two pieces click, you’re not just analyzing data—you’re telling a story with it.

# How PuppyGraph Enables Data Storytelling
Up to this point, we've looked at how graph databases can help you make sense of complex relationships in your data. But here’s the thing: most organizations are still working with traditional relational databases. That doesn’t mean they have to miss out on the benefits of graph analytics.

That’s where PuppyGraph fits in. As a **real-time, zero-ETL** graph query engine, PuppyGraph allows you to do away with the complicated Extract, Transform, Load (ETL) processes. You don’t need to export data, restructure it, or maintain a separate graph database. You can just plug in and start querying relationships the way they naturally exist in your data.

By removing the overhead of data transformation, PuppyGraph gives you space to explore. It helps teams move from static tables to something more dynamic, where relationships aren’t hidden across JOINs but are visible and queryable as first-class citizens.

It’s a more intuitive way to interact with your data—especially when you’re asking questions that revolve around connections, influence, or flow.

And it’s not just quick to get started—PuppyGraph is built for scale. Even when working with massive datasets, you can query across relationships in real time without waiting around. Whether you're exploring a handful of records or combing through petabytes, the performance stays fast and responsive, so you can stay focused on the questions that matter—not the infrastructure behind them.

# Conclusion
At the end of the day, so much of data analysis comes down to understanding how things are connected. Graph visualization makes those relationships tangible—transforming lines in a table into patterns you can actually see. Whether you're tracking system dependencies, mapping user behavior, or surfacing clusters in your network, graphs help those hidden links rise to the surface.

Traditionally, getting started with graph analytics meant a lot of setup and transformation. PuppyGraph changes that. By letting you query your relational data as a graph without the usual hassle, it gives you a direct path to exploring connections. And when you pair that with a powerful visualization tool like yWorks, your data becomes more than just numbers—it becomes a story you can follow and share.

With the right tools and the right layout, you can stop digging through rows and columns and start seeing the bigger picture your data has been waiting to tell.